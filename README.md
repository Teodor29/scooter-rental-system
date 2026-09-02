# Scooter Rental System

A full-stack scooter rental system developed as a group project at Blekinge Institute of Technology. It includes customer web and mobile apps, admin dashboard, backend and scooter simulation.

## Admin Dashboard
<img width="1440" height="900" alt="admin-dashboard" src="https://github.com/user-attachments/assets/fbcd4e86-187f-473b-aab2-a2682b13e608" />

## Web App
<img width="1440" height="900" alt="web-app" src="https://github.com/user-attachments/assets/6048ac1e-8415-4161-a824-93fd7ab74362" />

## Mobile App
<img width="270" height="480" alt="mobile-app1" src="https://github.com/user-attachments/assets/273ebd22-633d-4510-8fbb-26d473e03f37" />
<img width="270" height="480" alt="mobile-app2" src="https://github.com/user-attachments/assets/ea65e35a-9957-4a27-ad47-e5d80b041f73" />
<img width="270" height="480" alt="mobile-app3" src="https://github.com/user-attachments/assets/a2238329-9436-4145-8734-a5faa1ada042" />

## Technologies

- React
- JavaScript
- Node.js
- Express
- MongoDB
- Docker Compose

## Project Structure

- `admin-dashboard/` - Admin dashboard
- `web-app/` - Customer desktop app
- `mobile-app/` - Customer mobile app
- `backend/` - REST API and backend services
- `simulation/` - Scooter simulation
- `city-data/` - City data used to seed database
- `docker-compose.yml` - Docker Compose configuration file

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
