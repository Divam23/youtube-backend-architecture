# YouTube Backend Server

This is the backend service for a mini YouTube-style project. The server is being built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and **Redis**, with the foundation already prepared for authentication, video handling, uploads, and token management.

The project is currently in an early setup phase. Prisma models and the overall folder structure are in place, while most request handlers and route implementations are still being built.

## Current Stack

- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- Redis
- JWT authentication
- Bcrypt for password hashing
- Multer for file uploads

## Project Status

What is already set up:

- Prisma schema for core entities
- Generated Prisma client in `src/generated/prisma`
- Module-based folder structure for `auth` and `video`
- Config folders for database, Redis, and environment handling
- Middleware and utility folders for shared backend logic

What is still in progress:

- Express app bootstrapping
- Route registration
- Controller and service implementation
- Validation logic
- Upload pipeline integration

## Data Models

The current Prisma schema defines these models:

### `User`

- `id`
- `username`
- `email`
- `password`
- `avatarUrl`
- `bio`
- timestamps

### `Video`

- `id`
- `title`
- `description`
- `videoUrl`
- `thumbnailUrl`
- `duration`
- `size`
- `views`
- `isPublished`
- `ownerId`
- timestamps

### `RefreshToken`

- `id`
- `token`
- `userId`

### `VideoProcessingJob`

- `id`
- `videoId`
- `status`
- `startedAt`
- `completedAt`

## Folder Structure

```text
server/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ config/
│  ├─ generated/prisma/
│  ├─ middlewares/
│  ├─ modules/
│  │  ├─ auth/
│  │  └─ video/
│  ├─ routes/
│  └─ utils/
├─ .env
├─ prisma.config.ts
├─ package.json
└─ server.js
```

## Environment Variables

Create a `.env` file inside `server/` with the following values:

```env
DATABASE_URL="your pooled postgres url"
DIRECT_URL="your direct postgres url"
PORT=5000(example port)
```

Notes:

- `DATABASE_URL` is used for the normal Prisma connection.
- `DIRECT_URL` is used for direct database access during migrations.
- If your database password contains characters like `?`, `#`, or `+`, they must be URL-encoded.

## Installation

```bash
cd server
npm install
```

## Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Create and apply the first migration:

```bash
npx prisma migrate dev --name init
```

Open Prisma Studio if needed:

```bash
npx prisma studio
```

## Available Scripts

Start the server:

```bash
npm start
```

Current `package.json` scripts are minimal, so additional scripts like `dev`, `lint`, or `test` can be added as the project grows.

## Planned Modules

### Authentication

Planned responsibilities:

- register user
- login user
- hash passwords
- issue JWT access tokens
- manage refresh tokens

### Video

Planned responsibilities:

- upload video metadata
- attach thumbnail and video URLs
- track views
- manage published state
- support processing job records

## Notes For Development

- The Prisma client output is configured to generate into `src/generated/prisma`.
- This repository currently looks like a backend scaffold rather than a fully running API.
- Before implementing endpoints, it would be a good next step to finish `app.js`, `server.js`, config loaders, and route wiring.

## Next Recommended Steps

1. Finish Express app initialization.
2. Connect Prisma client and Redis client.
3. Implement auth routes and services.
4. Implement video upload flow.
5. Add validation and centralized error handling.
6. Add development scripts such as `dev` with `tsx watch`.
