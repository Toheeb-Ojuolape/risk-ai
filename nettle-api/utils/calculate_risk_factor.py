from datetime import datetime


def get_useful_life(type):
    if type == "Automobiles/Locomotives":
        useful_life =  5
    if type == "Furnitures":
        useful_life = 7
    if type == "Heavy Equipment":
        useful_life = 10
    if type == "Land/Building":
        useful_life = 15

    return useful_life


def get_incident_factor(last_incident):
    last_incident_date = datetime.strptime(last_incident, "%Y-%m-%d")
    
    today_date = datetime.now()
    
    days_difference = (today_date - last_incident_date).days
    
    if days_difference <= 30:
        incident_factor = 5
    elif days_difference <= 365:
        incident_factor = 3
    else:
        incident_factor = 1
    
    return incident_factor


def calculate_risk_score(type, years_of_use, last_incident):
    # Risk Score=(Age Factor)+(Incident Factor)
    useful_life = get_useful_life(type)
    age_factor =(years_of_use/useful_life) * 5
    incident_factor = get_incident_factor(last_incident)

    return age_factor + incident_factor

