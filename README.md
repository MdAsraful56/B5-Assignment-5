# B5-Assignment-5

## 🛠️ Technology Stack (Suggested)

| Category     | Tools                                              |
| ------------ | -------------------------------------------------- |
| ⚙️ Runtime   | Node.js                                            |
| 🔧 Framework | Express.js                                         |
| 🧠 Language  | TypeScript                                         |
| 🛢️ Database  | MongoDB + Mongoose                                 |
| 🛡️ Security  | jwt, bcrypt                                        |
| 📦 Others    | cors, cookie-parser, zod, dotenv, etc. (as needed) |

---

#### A role-based backend API for a ride booking system built with Express.js and Mongoose. This API allows riders to book rides, drivers to accept and complete rides, and admins to manage the platform.

## 📌 Project Features

#### 🔐 JWT-based authentication with role support (rider, driver, admin)

#### 🔒 Secure password storage using bcrypt

#### 🎭 Role-based route protection

#### 🚕 Ride lifecycle handling (requested → accepted → picked_up → completed)

#### 📜 Ride history, cancellation, and earnings tracking

#### 📦 Scalable and modular codebase

#### ✅ Admin capabilities (driver approval, user blocking)

## 🏗️ Folder Structure

```
src/
├── modules/
│   ├── auth/           # Login, signup, JWT
│   ├── user/           # Common user logic
│   ├── driver/         # Driver-specific logic
│   ├── ride/           # Ride creation, status, history
├── middlewares/        # Auth, role check, error handlers
├── config/             # DB connection, environment config
├── utils/              # Helper functions
├── app.ts              # Express app setup

```

## 🔑 Authentication & Authorization

#### >> Login / Register routes for rider/driver/admin

#### >> JWT Token returned on successful login

#### >> Middleware checks:

#### > authMiddleware → verifies token

#### > authorizeRoles("admin") → restricts access by role

## 📲 API Endpoints Overview

❗ Example base URL: https://assignment-5-five-red.vercel.app/api/v1

### 🪪 User

Create User : https://assignment-5-five-red.vercel.app/api/v1/user/register

Get All User : https://assignment-5-five-red.vercel.app/api/v1/user/all-users

Get All Driver : https://assignment-5-five-red.vercel.app/api/v1/user/all-drivers

Get All Rider : https://assignment-5-five-red.vercel.app/api/v1/user/all-riders

Update User : https://assignment-5-five-red.vercel.app/api/v1/user/:id

Deleted User: https://assignment-5-five-red.vercel.app/api/v1/user/:id

### 🔐 Auth

Login User : https://assignment-5-five-red.vercel.app/api/v1/auth/login

Logout User : https://assignment-5-five-red.vercel.app/api/v1/auth/logout

reset / change Password : https://assignment-5-five-red.vercel.app/api/v1/auth/reset-password

Refresh Token : https://assignment-5-five-red.vercel.app/api/v1/auth/refresh-token

### 🧍 Rider

Create Ride : https://assignment-5-five-red.vercel.app/api/v1/ride/create

Update Ride : https://assignment-5-five-red.vercel.app/api/v1/ride/:id

Deleted Ride : https://assignment-5-five-red.vercel.app/api/v1/ride/:id

Get My Ride : https://assignment-5-five-red.vercel.app/api/v1/ride/my-rides

Get My Ride Status :https://assignment-5-five-red.vercel.app/api/v1/ride/stats

### 🚗 Driver

Create Pick : https://assignment-5-five-red.vercel.app/api/v1/driver/pick-up-ride/:id

Update Pick : https://assignment-5-five-red.vercel.app/api/v1/driver/update-ride-status/:id

Get My Pick : https://assignment-5-five-red.vercel.app/api/v1/driver/my-rides

Get Available Pick : https://assignment-5-five-red.vercel.app/api/v1/driver/available-rides

### Thanks For checking out my project! If you have any questions or suggestions, feel free to reach out.
