# Scooter Rental System

A full-stack web application for renting and managing electric scooters, developed as a group project at Blekinge Institute of Technology.

The system consists of a backend API, three clients (admin, mobile, and desktop), and a scooter simulation.

## My Role

I was primarily responsible for the frontend development and Docker-based containerization for local development.

## Tech Stack

- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Tools:** Docker

## Project Structure

```text
├── admin-webclient/   # Admin client
├── webclient/         # Customer desktop client
├── mobileclient/      # Customer mobile client
├── backend/           # REST API and backend services
├── simulation/        # Scooter simulation
└── docker-compose.yml # Local development environment
```

## Run with Docker

**Requirements:** Docker installed.

1. Clone the Repository

```bash
git clone https://github.com/Teodor29/scooter-rental-system
cd scooter-rental-system
```

2. Configure Environment Variables

Create a `.env` file in the root directory `scooter-rental-system` from `.env.example`

3. Build and Start the System with Docker Compose

```bash
docker compose up --build
```

- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Admin Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Web Client**: [http://localhost:3001](http://localhost:3001)
- **Mobile Client**: [http://localhost:3002](http://localhost:3002)
