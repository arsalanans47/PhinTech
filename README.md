# PhinTech Backend

PhinTech is a finance data processing and access-control backend built with Express, Sequelize, and MySQL.
It provides APIs for:

- User management with role-based access checks (Admin, Analyst, Viewer)
- Financial record CRUD operations
- Reporting and analytics endpoints (total income, total expense, net balance, category totals, recent activity)

## Table of Contents

- Project Overview
- Tech Stack
- Features
- Prerequisites
- Local Setup
- Environment Configuration
- Database Configuration
- Run Migrations
- Seed Initial Data
- Start the Server
- API Usage
- Request Flow Architecture
- Folder Structure
- Notes and Recommendations
- Troubleshooting

## Project Overview

This backend is designed for managing financial records with clear separation of concerns:

- Routes define API endpoints
- Middlewares validate incoming requests
- Controllers handle HTTP input/output
- Services apply business rules and authorization
- Repositories handle database interaction through Sequelize models

## Tech Stack

- Node.js
- Express
- Sequelize ORM
- MySQL
- bcrypt (password hashing)
- dotenv
- http-status-codes

## Features

### User Features

- Create user (admin-only action)
- Get user by id
- Get all users (admin validation)
- Update user (admin validation)
- Delete user (admin validation)

### Financial Record Features

- Create record (admin-only action)
- Get record by id
- Get all records with optional filters
- Update record (admin validation)
- Delete record (admin validation)

### Analytics Features

- Total income
- Total expense
- Net balance
- Category-wise total
- Recent activity (latest updated 3 records)
- Analytics route access control: Admin and Analyst only (Viewer is restricted)

## Prerequisites

Before running this project, ensure you have:

- Node.js (LTS recommended)
- npm
- MySQL server running locally
- A MySQL user with permissions to create/use database

## Local Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd PhinTech
```

2. Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a .env file in the project root:

```env
PORT=3000
```

Notes:

- PORT is read from src/config/server-config.js
- Password hashing salt is generated internally in code

## Database Configuration

Update src/config/config.json with your MySQL credentials:

```json
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "phintech_db_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Create the development database in MySQL before migration:

```sql
CREATE DATABASE phintech_db_dev;
```

## Run Migrations

Run Sequelize migrations to create tables:

```bash
npx sequelize-cli db:migrate --config src/config/config.json --migrations-path src/migrations
```

This creates:

- users
- financial_records

## Seed Initial Data

Run seeders to insert sample data:

```bash
npx sequelize-cli db:seed:all --config src/config/config.json --seeders-path src/seeders
```

This seeds:

- Sample users
- Sample financial records

## Start the Server

```bash
npm start
```

Current start script:

- Runs nodemon on src/index.js
- Server mounts APIs under /api/v1

## API Usage

Complete endpoint-level documentation is available in:

- API_DOCUMENTATION.md

Use that file to test all APIs after startup.

Analytics endpoints require requester id (`userId`) and enforce role checks:

- Allowed roles: `Admin`, `Analyst`
- Denied role: `Viewer`
- Recommended usage for GET analytics routes:
  - `/api/v1/record/total-income?userId=1`
  - `/api/v1/record/total-expense?userId=1`
  - `/api/v1/record/net-balance?userId=1`
  - `/api/v1/record/recent-activity?userId=1`

## Request Flow Architecture

Each incoming request follows this flow:

1. Route layer
- Matches endpoint in src/routes/v1/index.js

2. Middleware layer
- Validates required request fields in src/middlewares
- Performs role-based access checks for analytics routes

3. Controller layer
- Reads req, calls service, returns standardized response

4. Service layer
- Applies business rules and role/authorization checks

5. Repository layer
- Builds queries and talks to Sequelize models

6. Model/DB layer
- Sequelize model maps to MySQL table and executes queries

Flow diagram (logical):

Client -> Route -> Middleware -> Controller -> Service -> Repository -> Model -> MySQL

## Folder Structure

```text
PhinTech/
├── src/
│   ├── config/
│   │   ├── config.json
│   │   └── server-config.js
│   ├── controllers/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── repository/
│   ├── routes/
│   │   └── v1/
│   ├── seeders/
│   ├── services/
│   └── index.js
├── API_DOCUMENTATION.md
├── package.json
└── README.md
```

## Notes and Recommendations

- Some GET endpoints currently use req.body for input in implementation. HTTP best practice is:
  - Use query params for GET
  - Use request body for POST/PATCH/PUT
- Keep static routes before dynamic routes (for example /record/recent-activity before /record/:id) to avoid route conflicts.
- Ensure category names are consistent between business rules and seeded/test data.

## Troubleshooting

### Cannot GET /api/v1//... (double slash)

Use a single slash between path segments:

- Correct: /api/v1/record/category-total
- Wrong: /api/v1//record/category-total

### Migration or seeding fails

- Verify MySQL service is running
- Verify src/config/config.json credentials
- Verify database exists
- Rerun migration command with explicit config and paths

### Permission errors in user/record actions

Many write operations require an admin identifier in payload as per current service logic.

## License

ISC
