# Hackathon Admin Panel

A simple admin panel for managing hackathon applications.

## Features

- Basic authentication (username/password)
- List all applicants with search functionality
- View detailed application information
- Update application status (Accept, Waitlist, Reject)

## Tech Stack

- Next.js 14 with App Router
- Tailwind CSS for styling
- PostgreSQL with Prisma ORM
- Server Actions/API Routes for data fetching

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hackathon-admin
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables by creating a `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/hackathon?schema=public"
```

4. Set up the database:

```bash
pnpm prisma db push
```

5. Run the development server:

```bash
pnpm dev
```

### Seeding the Database

To populate the database with sample data, you can use the seed API:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or navigate to `/api/seed` in your browser while the application is running.

## Usage

1. Access the application at `http://localhost:3000`
2. Log in with the credentials:
   - Username: `admin`
   - Password: `admin123`
3. Use the search functionality to find applicants
4. Click on "Details" to view the full application
5. Update application status using the action buttons

## License

MIT  