# Crash Trace Server

Backend REST API for Crash Trace, a road accident reporting system. Built with Node.js, Express and MongoDB.

## Features

- User registration and login with JWT authentication
- Password reset with email OTP verification
- Accident report creation, editing, searching and approval
- Voting on approved reports
- Image upload and retrieval
- Summary statistics endpoint

## Requirements

- Node.js 18 or newer
- MongoDB
- An SMTP account for sending OTP emails

## Setup

```bash
npm install
cp .env.example .env
```

Fill in the values in `.env`:

| Variable | Description |
| --- | --- |
| `PORT` | Port the server listens on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `1d` |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `FROM_EMAIL` | Address shown as the sender |
| `CLIENT_URL` | Frontend URL used in email links |

## Running

```bash
npm run dev    # development, with nodemon
npm start      # production
```

With Docker:

```bash
docker compose up --build
```

## API

All routes are prefixed with `/api`. Endpoints marked with a lock require an
`Authorization: Bearer <token>` header.

### Auth — `/api/auth`

| Method | Path | Description |
| --- | --- | --- |
| POST | `/register` | Create a new account |
| POST | `/login` | Log in and receive a token |
| POST | `/sendOtp` | Send an OTP to an email address |
| POST | `/verifyOtp` | Verify a received OTP |
| POST | `/newPassword` | Set a new password |
| GET | `/userProfile` | 🔒 Get the logged in user's profile |

### Reports — `/api/reports`

| Method | Path | Description |
| --- | --- | --- |
| POST | `/create` | 🔒 Submit a new report |
| GET | `/approvedReports` | 🔒 List approved reports |
| GET | `/allReports` | 🔒 List all reports |
| POST | `/searchReport` | 🔒 Search reports |
| PUT | `/editReport` | 🔒 Edit a report |
| POST | `/processReport` | 🔒 Approve or reject a report |
| POST | `/vote` | 🔒 Vote on a report |

### Images — `/api/images`

| Method | Path | Description |
| --- | --- | --- |
| POST | `/upload` | 🔒 Upload an image (multipart field `image`) |
| POST | `/getImage` | 🔒 Fetch a stored image |

### Stats — `/api/stats`

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | 🔒 Get summary statistics |

## Project structure

```
Server.js              entry point
src/
  App.js               express app and route mounting
  config/              database and email configuration
  routes/              route definitions
  controllers/         request handlers
  services/            business logic
  models/              mongoose schemas
  middlewares/         auth and error handling
  utilities/           OTP, token and mail helpers
  response/            shared API response format
```

## License

ISC
