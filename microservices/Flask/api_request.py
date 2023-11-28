import requests
import json

data = {
    "id": 3,
    "name": "Francois",
    "surname": "Lagarde",
    "job": "bus driver"
}

url = "http://localhost:5000/create"

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(data), headers=headers)

print(response.status_code)
print(response.json)

