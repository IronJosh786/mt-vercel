# Money Transfer

This project is a Full Stack MERN application designed for facilitating money transfers, akin to a financial transaction application.

## Table of Contents

- [Features](#features)

- [Getting Started](#getting-started)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Controllers](#controllers)

  - [1. User Controller](#1-user-controller)

  - [2. Transaction Controller](#2-transaction-controller)

- [Models](#models)

  - [1. User Model](#1-user-model)

  - [2. Transaction Model](#2-transaction-model)

## Features

- User registration and authentication
- User login/logout functionality
- View all registered users
- Send money to other users (new transaction)
- View transaction history
- Update user profile information

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js

- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IronJosh786/moneyTransfer.git
   ```

2. Change to the project directory

   ```bash
   cd moneyTransfer
   ```

3. Create a .env file in the root directory and configure the following environment variables:

   ```bash
   PORT,
   CORS_ORIGIN,
   MONGODB_URI,
   ACCESS_TOKEN_SECRET,
   ACCESS_TOKEN_EXPIRY,
   REFRESH_TOKEN_SECRET,
   REFRESH_TOKEN_EXPIRY,
   CLOUDINARY_CLOUD_NAME,
   CLOUDINARY_API_KEY,
   CLOUDINARY_API_SECRET
   ```

4. Install the dependencies

   ```bash
   npm install
   ```

5. Start the development server

   ```bash
   npm start
   ```

## Controllers

### 1. User Controller

Handles user-related functionalities such as registration, login, viewing all users, and updating user profiles.

### 2. Transaction Controller

Manages transactions between users, including sending money to other users and viewing transaction history.

## Models

### 1. User Model

Model for user information including username, email, password (hashed), and profile details.

### 2. Transaction Model

Model to store information about transactions, including sender, receiver, amount, date/time, and any additional details.
