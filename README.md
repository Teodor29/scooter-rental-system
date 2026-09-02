# Scooter Rental System

A full-stack scooter rental system developed as a group project at Blekinge Institute of Technology. It includes customer web and mobile clients, an admin dashboard, a REST API, MongoDB, and a scooter simulation.

## Technology

React, JavaScript, Vite, Node.js, Express, MongoDB and Docker Compose.

## Project Structure

- `backend/` - REST API and backend services
- `web-app/` - Customer desktop client
- `mobile-app/` - Customer mobile client
- `admin-dashboard/` - Admin client
- `simulation/` - Scooter simulation
- `city-data/` - City data used to seed database
- `docker-compose.yml` - Local development environment

## Run with Docker

**Requirements:** Docker installed.

1. Clone the Repository

```bash
git clone https://github.com/Teodor29/scooter-rental-system
cd scooter-rental-system
```

2. Configure Environment Variables

```bash
cp .env.example .env
```

3. Build and Start the System with Docker Compose

```bash
docker compose up --build
```

- **Backend**: [http://localhost:5000](http://localhost:5000)
- **Admin Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Web Client**: [http://localhost:3001](http://localhost:3001)
- **Mobile Client**: [http://localhost:3002](http://localhost:3002)

### Seed the Database

From the repository root, run:

```bash
cd simulation
npm run seed
```

This imports the city data and creates the initial scooters, customers, and
admin account in the database.
