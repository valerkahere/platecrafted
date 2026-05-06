# Platecrafted™

I'm tired of the Sunday evening ritual. What do I eat this week? How do I cook it? What do I even buy?

Platecrafted fixes that. Search meals, filter by ingredient or cuisine, watch how to cook them, and save your favourites so you stop finding the same recipe from scratch every time.

## Monorepo Architecture
- Backend (server) uses Express.js REST API, connecting to MongoDB
- Frontend uses Angular, talks to the Backend API
- Meal data comes from [TheMealDB](https://www.themealdb.com/) public API — free, no key needed
- Deployed on AWS when required (EC2, S3)

> **DON'T WORRY**! Running this locally is as simple as it gets. See below:

## How To Run:
### 1. Download locally (using git and bash)

```bash
git clone https://github.com/valerkahere/platecrafted
cd ./platecrafted
```

### 2. Backend Setup

2.1 Follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide to create a free account, spin up a cluster, and grab your connection string:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

> [!IMPORTANT]
> Once your cluster is live, MongoDB Compass makes it easy to browse your data locally.

2.2 Create a `.env` file at `platecrafted/backend/.env`

2.3 Paste your connection string from step 2.1 into that file

2.4 Install dependencies across the monorepo:

```bash
npm install
```

### 3. That's it!

```bash
npm run dev
```

> [!NOTE]
> Frontend and backend start together automatically
> using *concurrently* when `npm run dev` runs (see "scripts" in package.json at the root of the project)
