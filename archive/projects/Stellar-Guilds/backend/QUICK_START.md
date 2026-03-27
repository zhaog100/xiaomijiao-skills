# Quick Start Guide - PostgreSQL & Prisma

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js >= 18
- [ ] Docker and Docker Compose installed
- [ ] Git installed

## 🚀 Setup in 4 Steps

### Step 1: Clone and Install Dependencies (5 minutes)
```bash
# Navigate to backend directory
cd backend

# Install npm packages
npm install
```

### Step 2: Create Environment File (1 minute)
```bash
# Copy template to actual .env file
cp .env.example .env

# Optional: Verify the content
cat .env
```

**Expected output**:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stellar_guilds_dev"
PORT=3000
NODE_ENV=development
```

### Step 3: Start PostgreSQL Database (2 minutes)
```bash
# Start PostgreSQL in Docker
docker-compose up -d

# Wait for database to be ready (10-30 seconds)
docker-compose logs postgres
```

**Look for**:
```
database system is ready to accept connections
```

### Step 4: Run Database Migration (2 minutes)
```bash
# Create database tables
npm run db:migrate --name "init"

# Expected output: Migration created and applied successfully
```

---

## ✅ Verify Everything Works

### Check 1: Generate Prisma Client
```bash
npm run db:generate
```
**Expected**: ✔ Generated Prisma Client successfully

### Check 2: Build TypeScript
```bash
npm run build
```
**Expected**: No errors, `/dist` folder created

### Check 3: Start Development Server
```bash
npm run start:dev
```
**Expected**: 
```
[Nest] - 01/26/2026, 7:22:13 AM     LOG [NestFactory] Starting Nest application...
[Nest] - 01/26/2026, 7:22:14 AM     LOG [InstanceLoader] PrismaModule dependencies initialized
[Nest] - 01/26/2026, 7:22:14 AM     LOG [InstanceLoader] ConfigModule dependencies initialized
...
```

### Check 4: View Database Schema (Optional)
```bash
npm run db:studio
# Opens Prisma Studio in browser at http://localhost:5555
```

---

## 🛠️ Common Development Commands

```bash
# Prisma commands
npm run db:generate      # Generate Prisma client (run after schema changes)
npm run db:push          # Push schema changes to database (destructive)
npm run db:migrate       # Create and run migrations (recommended)
npm run db:studio        # Open Prisma Studio GUI

# NestJS commands
npm run build            # Build TypeScript to JavaScript
npm run start            # Start production server
npm run start:dev        # Start development server with watch
npm run start:debug      # Start with debugger
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:e2e         # Run E2E tests
```

---

## 🔍 Troubleshooting

### ❌ "prisma: command not found"
```bash
npm install
```

### ❌ "Database connection failed"
```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
docker-compose logs -f postgres  # Watch for ready status
```

### ❌ "DATABASE_URL not found"
```bash
# Ensure .env file exists
ls -la .env

# If missing, create it
cp .env.example .env

# Verify it contains DATABASE_URL
grep DATABASE_URL .env
```

### ❌ "Migration failed"
```bash
# Reset database (development only!)
npx prisma migrate reset

# Then re-run migration
npm run db:migrate --name "init"
```

### ❌ "Port 5432 already in use"
```bash
# Stop the conflicting process or use different port in docker-compose.yml
docker-compose down
docker-compose up -d
```

---

## 📚 Type-Safe Database Operations

Once setup is complete, you can use type-safe Prisma operations:

```typescript
// Example: Create a user
const user = await this.prisma.user.create({
  data: {
    email: 'john@example.com',
    username: 'john_doe',
    password: 'hashed_password',
    firstName: 'John',
    lastName: 'Doe',
  },
});

// Example: Query users
const users = await this.prisma.user.findMany({
  include: {
    ownedGuilds: true,
    joinedGuilds: true,
  },
});

// Example: Update with relations
const updatedGuild = await this.prisma.guild.update({
  where: { id: guildId },
  data: {
    name: 'New Name',
    memberships: {
      connect: [{ id: membershipId }],
    },
  },
  include: {
    owner: true,
    memberships: true,
  },
});
```

---

## 🎯 Quick Verification Checklist

- [ ] Docker running: `docker-compose ps` shows `postgres` running
- [ ] .env file created with DATABASE_URL
- [ ] Dependencies installed: `npm install` ran successfully
- [ ] Prisma client generated: `npm run db:generate` shows ✔
- [ ] TypeScript compiles: `npm run build` no errors
- [ ] Server starts: `npm run start:dev` shows Nest application starting
- [ ] Database migrated: `npm run db:migrate` applied migrations

---

## 📞 Need Help?

See the full verification report: [POSTGRES_PRISMA_VERIFICATION.md](../POSTGRES_PRISMA_VERIFICATION.md)

Key files to understand:
- [prisma/schema.prisma](prisma/schema.prisma) - Database schema definition
- [src/prisma/prisma.service.ts](src/prisma/prisma.service.ts) - Prisma integration
- [src/prisma/prisma.module.ts](src/prisma/prisma.module.ts) - NestJS module
- [docker-compose.yml](docker-compose.yml) - PostgreSQL Docker setup

---

**Status**: ✅ Everything configured and ready!
