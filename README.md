# Nettle Technical Assessment


**Date: Jan 13th, 2025**

## Planning

> 1. What is the rough plan for the application?

The rough idea for the dashboard is a platform that enables underwriters to signup with their details, add an asset (its value, name, location e.t.c) and then get data about the asset's potential natural disasters/ risks. This data will come from news or weather data related to the location. There will also be a data interpretation or metric evaluation system in the backend that will take in all these data to generate a "Risk score" for the asset taken all of these into account 


> 2. What features do I want to develop?

[x] Authentication (Signup, Google Signup, Login, Forgot Password, User Profile).

[x] Add Asset (can be a two/three step process, which would take in the exact location of the asset powered by Google Maps API). Takes in Asset name, location, Manufacturer, Cost, Years of usage, Last fault incident (if applicable).

[x] Customize the report to show different types of natural disasters which users can toggle on or off

[x] Generate Qualitative/Quantitative Risk Assessment Report about the asset based on information about the asset's location, weather data, years of use and other information supplied about the asset.

[x] Personalized AI Assistant that fetch data about an asset and give a brief/concise summary of the asset's Qualitative/Quantitative Risk Assessment. 

[x] Email notification service to let users know when their report is ready (provided the report generation step takes time).

[x] Users can download a copy of their report as a PDF 


> 3. What is the application architecture?

- A web application that connects to a backend with services connecting to different 3rd party endpoint (Gemini AI, Google Maps API, Google Weather API)

> 4. What technologies will I be using?

- Frontend - React.js, Mantine, Chainlit (UI for the AI Assistant)

- Backend - Python (FastAPI), Google News API, Firebase 

- Database - Firestore

> 5. What is my chosen data source?

- Google News API for obtaining recent news data about natural disasters (floods, earthquakes, wildfires)

- Gemini API for AI content creation and data summary

- Google Maps API & Google Places API for obtaining exact location data for an asset (longitude, latitude, altitude above sea level e.t.c)

- OpenWeather API & WeatherAPI for obtaining future and forecasted weather data about the location of an asset


## Project Architecture
<img width="1137" alt="Screenshot 2025-01-14 at 13 34 35" src="https://github.com/user-attachments/assets/4bebf45b-ee6b-4e75-b3f2-c471f98c4961" />



## Deployment & Packaging

The project is available for setup using Docker or using npm for React and pip (uvicorn) for python

## For Frontend

**NOTE:** Please make sure to create and populate the .env file before trying to run the project
 
### Using Docker

```
cd nettle-app
docker-compose up --build

```

### Using npm

```
cd nettle-app
npm i
npm run dev

```


## For Backend

**NOTE:** Please make sure to create and populate the .env file before trying to run the project

### Using Docker

```
https://github.com/Toheeb-Ojuolape/risk-ai.git
cd nettle-api
docker-compose up --build
```

### Using pip

```
git clone https://github.com/Toheeb-Ojuolape/risk-ai.git
cd nettle-app
pip install --no-cache-dir -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```


# 🔗 Deployment

The project is available in production at the following links:

**Frontend:** https://risk-ai-app.netlify.app/

**Backend:** https://risk-ai.onrender.com/



## Documentation

### Documentation for React Frontend

The key features of the frontend application are:

1. Signup/Login with email or Google
2. Dashboard screen displaying statistics of assets under management, overall risk score and risk history
3. An add asset feature that enables users enter the details of their asset
4. A customize report feature that enables users to choose which natural disasters they would like to see in their report
5. A generate and download report feature that enables users to generate report and download it once it is ready. (An email notification is sent to users once their report is ready)
6. A ChatGPT-like AI-assistant called RiskAI that can provide personalized advice and assistance to users on their uploaded assets


### Documentation for Python (FastAPI) Backend

All endpoints developed for the project and all 3rd party services are properly documented in the link below with sample requests and responses


https://documenter.getpostman.com/view/25719172/2sAYQXnXwu#f64edafc-6eab-45a6-8b23-edda4473b0ac


## Future Improvements
> What would you do if you had more time or resources?

- Write unit tests and integration tests for backend and frontend features
- Enable underwriters to be able to upload images of the assets and use this image data to further finetune the reports
- Implement a second-layer filter of the news information obtained from the Google News API to improve accuracy
- Develop a speech-to-text feature that enables users to speak to the platform and get things done through speech rather than typing
