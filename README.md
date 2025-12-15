# MetaPhysicalLabs Backend

Backend API for 3D Manual Platform with Better Auth integration.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Better Auth
- **Cache/Queue:** Redis + BullMQ
- **Storage:** AWS S3 / Cloudflare R2
- **Payments:** Stripe

## Features

- ✅ Better Auth integration (email/password + OAuth)
- ✅ Multi-tenant organization support
- ✅ User roles & permissions
- ✅ 3D manual management
- ✅ Product catalog integration (Shopify, WooCommerce)
- ✅ QR code generation
- ✅ Analytics & revenue tracking
- ✅ Stripe payment integration

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- Redis (optional, for queue)

### Installation

```bash
# Install dependencies
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Run development server
npm run dev
```

### Environment Variables

See `.env.example` for required environment variables.

**Required:**
- `MONGODB_URI` - MongoDB connection string
- `BETTER_AUTH_SECRET` - Better Auth secret key
- `BETTER_AUTH_URL` - Backend URL (http://localhost:3001)

## API Documentation

See [Frontend Auth Integration Guide](./docs/frontend_auth_integration.md) for authentication APIs.

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── models/         # MongoDB models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── validators/     # Request validators
```

## License

Private - MetaPhysical Labs
