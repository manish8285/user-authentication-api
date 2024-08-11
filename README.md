# User Authentication API

This project is a robust user authentication API built with Node.js, Express, and MySQL. It provides endpoints for user registration, login, logout, email verification, and profile management.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Installing Dependencies](#installing-dependencies)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Testing the APIs](#testing-the-apis)
8. [Error Handling](#error-handling)
9. [Contributing](#contributing)
10. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MySQL (v5.7 or later)
- Git

## Getting Started

### Cloning the Repository

To clone the repository, run the following command in your terminal:

```
git clone https://github.com/manish8285/user-authentication-api.git
```

### Installing Dependencies

Install the project dependencies by running:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=user_auth_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

Replace the placeholders with your actual MySQL credentials and choose a strong JWT secret.

## Database Setup

1. Log in to your MySQL server.
2. Create a new database:

```sql
CREATE DATABASE user_auth_db;
```

3. Use the newly created database:

```sql
USE user_auth_db;
```

4. Run the following SQL commands to create the necessary tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  isVerified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE verificationTokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## Running the Application

To start the server, run:

```
npm start
```

The server will start running on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

- `POST /auth/signup`: Register a new user
- `POST /auth/login`: Login a user
- `POST /auth/logout`: Logout a user (requires authentication)
- `GET /auth/verify-email/:token`: Verify user's email
- `GET /users/profile`: Get user's profile (requires authentication)
- `PUT /users/profile`: Update user's profile (requires authentication)

## Testing the APIs

You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the APIs. Here are some example requests:

### Sign Up

```
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

### Login

```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

### Get Profile (requires authentication)

```
GET http://localhost:3000/users/profile
Authorization: Bearer <your_access_token>
```

### Update Profile (requires authentication)

```
PUT http://localhost:3000/users/profile
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "username": "john_doe_updated"
}
```

### Logout (requires authentication)

```
POST http://localhost:3000/auth/logout
Authorization: Bearer <your_access_token>
```

## Error Handling

All API responses follow this structure:

```json
{
  "isError": boolean,
  "errorCode": "string" (only present if isError is true),
  "message": "string"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
