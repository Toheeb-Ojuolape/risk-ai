import os
import json
import requests
from fastapi import HTTPException, Request
from dotenv import load_dotenv
import chainlit as cl
import urllib3
from utils.auth import fetch_user
from firebase_admin import firestore


db = firestore.client()

# Load environment variables from .env
load_dotenv()

# Get the Gemini API URL and Key from environment variables
GEMINI_API_URL = os.getenv('GEMINI_API_URL')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')


def get_prompt(message: str, history: list[str] = None) -> str:
    system = 'You are Risk-focused and Insurance-focused AI assistant that gives helpful answers. You answer questions with detailed and well-formatted responses and empirical evidence'
    prompt = f"### System:\n{system}\n\n### User:\n"
    if history is not None:
        prompt += f"This is the conversation history: {''.join(history)}. Now answer the question: "
    prompt += f"{message}\n\n### Response:\n"
    return prompt


def llm(prompt):
    try:
        url = f"{GEMINI_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        payload = json.dumps({'contents': [{'parts': [{'text': f"{prompt}"}]}]})
        headers = {'Content-Type': 'application/json'}
        response = requests.request('POST', url, headers=headers, data=payload)
        response.raise_for_status()  # Raise an error for HTTP issues
        response_data = response.json()
        candidates = response_data.get('candidates', [])
        if candidates and 'content' in candidates[0]:
            parts = candidates[0]['content'].get('parts', [])
            if parts:
                return parts[0].get('text', 'AI not responsive')
        return 'No candidates or text found in the response.'
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while generating report from Gemini: {e}"
        )


def fetch_asset(id):
    try:
        data = db.collection('assets').document(id).get()
        return data.to_dict()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error encountered while generating report from Gemini: {e}"
        )


# Chainlit handler for user messages
@cl.on_message
async def on_message(message: cl.Message):
    if (
        'Conduct qualitative/quantitative risk assessment of asset'
    ).lower() in message.content.lower():
        assetId = message.content.split(':')[1].strip()
        await cl.Message(f"Generating a short report on your asset, please wait...").send()
        asset = fetch_asset(assetId)
        prompt = f"Write a concise qualitative/quantitaive risk assessment of the asset with details {asset}"

        message_history = cl.user_session.get('message_history')
        msg = cl.Message(content='')
        await msg.send()

        prompt = get_prompt(prompt, message_history)
        answer = ''
        for word in llm(prompt):
            await msg.stream_token(word)
            answer += word
        message_history.append(answer)
        await msg.update()
        return
    
    message_history = cl.user_session.get('message_history')
    msg = cl.Message(content='')
    await msg.send()

    prompt = get_prompt(message.content, message_history)
    answer = ''
    for word in llm(prompt):
        await msg.stream_token(word)
        answer += word
    message_history.append(answer)
    await msg.update()


@cl.on_chat_start
async def on_chat_start():
    path = cl.user_session.get('http_referer')

    # get query string from path
    query_string = urllib3.util.parse_url(path).query
    token = query_string.split('=')[1]
    user = await fetch_user(token)

    cl.user_session.set('message_history', [])
    cl.user_session.set('user', user._data)

    await cl.Message(
        f"Hi {user._data['displayName']} 👋🏾, my name is RiskAI by Nettle. How can I be of service to you?"
    ).send()

    await cl.Message(
        f"If you want me to write up a qualitative/quantitative risk assessment of one of your assets, simply send the prompt below (Please replace AssetID with your actual Asset's ID)"
    ).send()

    await cl.Message(
        f"Conduct qualitative/quantitative risk assessment of asset: AssetID"
    ).send()
