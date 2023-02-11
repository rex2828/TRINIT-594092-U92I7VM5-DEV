# tri-nit

Used API : https://api.websitecarbon.com/

Endpoint :
https://api.websitecarbon.com/site?url=https://google.com

Response : 
{
    "url": "https://www.wholegraindigital.com/",
    "green": true,
    "bytes": 443854,
    "cleanerThan": 0.83,
    "statistics": {
        "adjustedBytes": 335109.77,
        "energy": 0.0005633320052642376,
        "co2": {
            "grid": {
                "grams": 0.26758270250051286,
                "litres": 0.14882949913078525
            },
            "renewable": {
                "grams": 0.24250694721722435,
                "litres": 0.13488236404222018
            }
        }
    }
}



Chrome Extension

Extension should be activated every time a website is visited, it should hit the api and store some data.


Make a browser extension and calculate carbon footprint based on the total data sent/received when a user visits any website.
Generate and display to the user the expected carbon footprint he has caused by visiting various websites.
Create a website and display web pages based on their rank based on the overall footprint.
Provide detailed carbon emissions caused by users on different sessions.
To categorise websites as Green, Semi-Green, and Non-Green using parameters from emission data.



Store all-time data showing the total emission caused by the user. 
      ● Recommend users visit sites with a lesser footprint and provide similar functionality. 
     ● Recommend users to upgrade their network depending upon the percentage of packets lost during transmission.


Schema:

User
UserId
Username
Password
Visited Websites [ ]
Total Carbon Emitted
Sessions
SessionId
UserId (ref)
Website URL
Carbon Emitted
