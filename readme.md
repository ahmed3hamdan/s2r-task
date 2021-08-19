# S2R Task

## Contents

- MongoDB
- API
- WebApp built in React

## Requirements

- Docker
- Docker Compose

## Configuration
Copy `env.example` file to `.env` and update variables as needed.

## Start the services

```bash
docker-compose up
```

## Populate your database with few restaurants
Create `s2r` database and import the following in `restaurants` collection:
```json
[
  {
    "_id": {
      "$oid": "6019c2c6f2c1e100082bcb0e"
    },
    "name": "Food Express",
    "position": {
      "lat": 25.3945868,
      "lng": 55.4434653
    },
    "location": {
      "emirate": "Ajman",
      "area": "Al Rashidiya 3",
      "address": "Behind Day to Day Beside bus station"
    }
  },
  {
    "_id": {
      "$oid": "6019c2ccf2c1e100082bcb10"
    },
    "name": "Wardat Beijing Restaurant",
    "position": {
      "lat": 25.3556597,
      "lng": 55.4388871
    },
    "location": {
      "emirate": "Sharjah",
      "area": "Al Nabba",
      "address": "Al Sharq Street"
    }
  },
  {
    "_id": {
      "$oid": "6019c2d1f2c1e100082bcb12"
    },
    "name": "Allo Beirut - Lebanese Street Food",
    "position": {
      "lat": 25.0943901,
      "lng": 55.1825805
    },
    "location": {
      "emirate": "Dubai",
      "area": "Al Barsha",
      "address": "Hessa Street"
    }
  }
]
```
