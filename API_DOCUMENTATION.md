# PhinTech API Documentation

## Overview
This document describes the current REST API implemented in the PhinTech project.

- Base path: `/api/v1`
- Content type: `application/json`
- Default response envelope:

```json
{
  "success": true,
  "data": {},
  "message": "...",
  "err": {}
}
```

## Quick Start
If your server runs on port `3000`, the full base URL is:

`http://localhost:3000/api/v1`

## Data Models

### Financial Record
```json
{
  "id": 1,
  "amount": 2500.0,
  "type": "Income",
  "category": "Earning",
  "record_date": "2026-04-06",
  "notes": "April salary",
  "created_by": 1,
  "createdAt": "2026-04-06T10:00:00.000Z",
  "updatedAt": "2026-04-06T10:00:00.000Z"
}
```

### User
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "<bcrypt-hash>",
  "role": "Admin",
  "status": "Active",
  "createdAt": "2026-04-06T10:00:00.000Z",
  "updatedAt": "2026-04-06T10:00:00.000Z"
}
```

## Record APIs

### Analytics Access Control
- The following analytics routes are restricted to roles: `Admin`, `Analyst`
  - `/record/total-income`
  - `/record/total-expense`
  - `/record/net-balance`
  - `/record/category-total`
  - `/record/recent-activity`
- `Viewer` role is denied access.
- Pass requester id as `userId` in `req.body`.

### 1) Create Record
- Method: `POST`
- Path: `/record`
- Middleware validation requires: `amount`, `type`, `record_date`, `created_by`

Request:
```json
{
  "amount": 1200,
  "type": "Income",
  "category": "Earning",
  "record_date": "2026-04-06",
  "notes": "Freelance payment",
  "created_by": 1
}
```

Response: `201 Created`

---

### 2) Get Record By ID
- Method: `GET`
- Path: `/record/:id`

Response: `200 OK`

---

### 3) Get All Records (Optional Filtering)
- Method: `GET`
- Path: `/record`
- Current implementation accepts optional filter fields from body:
  - `record_date`
  - `category`
  - `type`

If no filter is passed, all records are returned.

Example filter body:
```json
{
  "type": "Expense",
  "category": "Food"
}
```

Response: `200 OK`

---

### 4) Update Record
- Method: `PATCH`
- Path: `/record/:id`
- Service validation requires admin `userId` in body.

Request:
```json
{
  "userId": 1,
  "amount": 180,
  "category": "Transport"
}
```

Response: `200 OK`

---

### 5) Delete Record
- Method: `DELETE`
- Path: `/record/:id`
- Service validation requires admin `userId` in body.

Request:
```json
{
  "userId": 1
}
```

Response: `200 OK`

---

### 6) Total Income
- Method: `GET`
- Path: `/record/total-income`
- Returns the sum of all records with `type = "Income"`.
- Access: `Admin`, `Analyst` only (`Viewer` forbidden)
- Required: `userId` in request body

Example:
`GET /record/total-income` with body `{ "userId": 1 }`

Response data example:
```json
12500.5
```

---

### 7) Total Expense
- Method: `GET`
- Path: `/record/total-expense`
- Returns the sum of all records with `type = "Expense"`.
- Access: `Admin`, `Analyst` only (`Viewer` forbidden)
- Required: `userId` in request body

Example:
`GET /record/total-expense` with body `{ "userId": 1 }`

Response data example:
```json
4500.75
```

---

### 8) Net Balance
- Method: `GET`
- Path: `/record/net-balance`
- Formula: `totalIncome - totalExpense`
- Access: `Admin`, `Analyst` only (`Viewer` forbidden)
- Required: `userId` in request body

Example:
`GET /record/net-balance` with body `{ "userId": 1 }`

Response data example:
```json
7999.75
```

---

### 9) Category Total
- Method: `GET`
- Path: `/record/category-total`
- Current implementation reads `category` from request body.
- Access: `Admin`, `Analyst` only (`Viewer` forbidden)
- Required for access: `userId` in request body
- Allowed categories:
  - `Earning`
  - `Food`
  - `Transport`
  - `Housing`
  - `miscellaneous`

Request body:
```json
{
  "userId": 1,
  "category": "Food"
}
```

Example path:
`GET /record/category-total`

Response data example:
```json
{
  "category": "Food",
  "total": 920.25
}
```

Validation error example (`400 Bad Request`):
```json
{
  "success": false,
  "data": {},
  "message": "Failed to fetch category total",
  "err": "Invalid category. Allowed categories: Earning, Food, Transport, Housing, miscellaneous"
}
```

---

### 10) Recent Activity
- Method: `GET`
- Path: `/record/recent-activity`
- Returns latest 3 rows ordered by `updatedAt DESC`.
- Access: `Admin`, `Analyst` only (`Viewer` forbidden)
- Required: `userId` in request body

Example:
`GET /record/recent-activity` with body `{ "userId": 1 }`

Response: `200 OK`

## User APIs

### 1) Create User
- Method: `POST`
- Path: `/user`
- Middleware requires: `name`, `email`, `password`, `role`, `status`, `id`
- `id` here is used as creator admin id for authorization.

Request:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "12345",
  "role": "Analyst",
  "status": "Active",
  "id": 1
}
```

Response: `201 Created`

---

### 2) Get User By ID
- Method: `GET`
- Path: `/user/:id`

Response: `200 OK`

---

### 3) Get All Users
- Method: `GET`
- Path: `/users`
- Service requires admin id in body: `id`

Request body:
```json
{
  "id": 1
}
```

Response: `200 OK`

---

### 4) Update User
- Method: `PATCH`
- Path: `/user/:id`
- Service requires admin id in body: `id`

Request:
```json
{
  "id": 1,
  "status": "Inactive"
}
```

Response: `200 OK`

---

### 5) Delete User
- Method: `DELETE`
- Path: `/user/:id`
- Service requires admin id in body: `id`

Request:
```json
{
  "id": 1
}
```

Response: `200 OK`

## Common Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource created.
- `400 Bad Request`: Validation/domain error (for example, invalid category).
- `403 Forbidden`: Role is not allowed (for example, Viewer on analytics routes).
- `404 Not Found`: Resource/user not found.
- `500 Internal Server Error`: Unhandled server/service/repository errors.

## Example cURL Commands

Create record:
```bash
curl -X POST http://localhost:3000/api/v1/record \
  -H "Content-Type: application/json" \
  -d '{"amount":1200,"type":"Income","category":"Earning","record_date":"2026-04-06","created_by":1}'
```

Get total income:
```bash
curl -X GET http://localhost:3000/api/v1/record/total-income \
  -H "Content-Type: application/json" \
  -d '{"userId":1}'
```

Get recent activity:
```bash
curl -X GET http://localhost:3000/api/v1/record/recent-activity \
  -H "Content-Type: application/json" \
  -d '{"userId":1}'
```

Get category total:
```bash
curl -X GET http://localhost:3000/api/v1/record/category-total \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"category":"Food"}'
```

## Implementation Notes
- Some `GET` endpoints currently expect body values (`/record`, `/record/category-total`, `/users`). This works in some clients but is not standard HTTP practice.
- For production-grade API design, consider moving those inputs to query params for `GET` endpoints, or use `POST` where request body is required.
- Route order is important in Express. Keep specific static routes (for example `/record/recent-activity`) above dynamic routes (`/record/:id`).
