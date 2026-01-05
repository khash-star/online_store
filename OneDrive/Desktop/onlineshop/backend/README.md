# Online Shop Backend API

Node.js + Express + PostgreSQL backend for Online Shop e-commerce platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-key
```

4. Create PostgreSQL database:
```sql
CREATE DATABASE onlineshop;
```

5. Run database migrations (coming soon):
```bash
npm run migrate
```

6. Start development server:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── config/                # Configuration files
│   └── database.js        # Database connection
├── routes/                # API routes
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── ...
├── controllers/           # Route controllers
├── models/                # Database models
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication
│   └── upload.js         # File upload
├── utils/                 # Utility functions
└── uploads/              # Uploaded files (dev only)
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📚 API Documentation

See `API_ENDPOINTS_SPEC.md` in the root directory for detailed API documentation.

## 🛠️ Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 📦 Deployment

This backend is designed to be deployed on:
- **Render** (recommended) - Free tier with PostgreSQL
- **Railway** - Free tier with PostgreSQL

See `STACK_RECOMMENDATION.md` for deployment instructions.

