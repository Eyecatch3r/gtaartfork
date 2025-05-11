# GTA Art NPC Manager

This project is a custom [Next.js](https://nextjs.org/) application for managing and exploring a fictional universe of NPCs (Non-Playable Characters) inspired by organized crime, gangs, and city life. It allows users to register new NPCs, browse and search existing ones, and view detailed information about each character.

## Features

- **NPC Registration**: Add new NPCs with name, occupation, description, image, and role.
- **NPC Listing & Search**: Browse all NPCs, filter by role, and search by name or description.
- **Role Management**: NPCs can be assigned to various fictional families, gangs, or unaffiliated groups.
- **Visual Effects**: Includes animated background particles for a modern UI.
- **Prisma ORM**: Uses Prisma for database management (PostgreSQL or SQLite supported).

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Database Setup

- By default, the project supports both PostgreSQL and SQLite. Configure your database in the `.env` file:
  - For PostgreSQL, set `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`.
  - For SQLite, set `SQLITE_DATABASE_URL`.
- The Prisma schema is in `prisma/schema.prisma` (PostgreSQL) and `prisma/dev.prisma` (SQLite).
- To generate the Prisma client and migrate the database:

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## Main Pages & Components

- **/registernpc**: Register a new NPC with all required fields.
- **/listnpcs**: Browse, search, and filter all registered NPCs.
- **Searchbar**: Reusable search component in `app/components/Searchbar/searchbar.js`.
- **Particles**: Animated background in `app/components/particles.js`.
- **Background**: Example background image component in `app/components/Background.tsx`.

## Project Structure

- `app/` - Main application code (pages, components, logic)
- `prisma/` - Database schema and configuration
- `Persistence/` - Database file (if using SQLite)
- `public/` - Static assets (images, backgrounds)

## Roles

NPCs can be assigned to roles such as:
- Paternò Crime Family
- Giardinello Crime Family
- Favignana Crime Family
- Taiyan Long Triads
- The Paisanos
- The King Boys
- Carson Avenue Families
- The Clovers
- stal'noye bratstvo
- Kazaki
- Los Coyotes Cartel
- White Rabbit Outlaw MC
- Oropomo Tribe
- Unaffiliated

## Sample Data

A backup of sample NPCs is available in `app/dbbackup.js` for development or seeding.

## Deployment

The app can be deployed to [Vercel](https://vercel.com/) or any platform supporting Next.js. See [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is for educational and creative purposes.
