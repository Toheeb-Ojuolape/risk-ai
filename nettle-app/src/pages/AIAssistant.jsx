function AiAssistant() {
  return (
    <iframe
      className="iframe"
      src={`http://localhost:8000/assistant?token=${sessionStorage.getItem(
        "authToken"
      )}`}
    />
  );
}

export default AiAssistant;
