# Nettle Technical Assessment
Date: Jan 7th, 2025

## Planning
> Use this section to track your thinking, either using plain text, sketches or accessible links.
> 1. What is the rough plan for the application?
The rough idea for the dashboard would be a platform that enables underwriters to signup with their details, add an asset (its value, name, location e.t.c) and then get data about the asset's potential risks. This data can come from news or weather data related to the location. There will also be a data interpretation or metric evaluation system in the backend that will take in all these data to generate a "Risk score" for the asset taken all of these into account 

> 2. What features do I want to develop?
- Authentication (Signup, Login, Forgot Password, User Profile)
- Add Asset (can be a two/three step process, would take in the exact location of the asset powered by Google Maps API) 
 - takes in Asset name, location, Manufacturer, Cost, Years of usage, Last fault incident (if applicable)
- Generate data about the asset based on information about the asset's location, manufacturer, and other information supplied about the asset. 

> 3. What is the application architecture?
- A simple frontend application that connects to a backend with services connecting to different 3rd party endpoint (OPENAI/Claude, Google Maps API, Google Weather API)

> 4. What technologies will I be using?
- Frontend - React.js, Tailwind, Mantine
- Backend - Python (FastAPI), Firebase (for speed and ease of deployment)

> 5. What is my chosen data source?
- Data sources - Google News API, Gemini API for AI content creation, Google Maps API, Google Places API, OpenWeather API

## Implementation
> Use this section to briefly justify your decisions.

### Data Source

### Technologies

### Testing

### Deployment & Packaging

## Documentation
> Create appropriate headings that describe how the app should be deployed and used.


## Future Improvements
> What would you do if you had more time or resources?