# Migration Next Steps

## 🎯 Current Status

### ✅ Completed
1. **Backend API** - All 47 endpoints implemented
2. **Frontend API Client** - All API functions created
3. **Authentication Context** - AuthProvider setup
4. **React Query** - Configured

### ⏳ Next Steps

## 1. Database Setup (CRITICAL)

### Create PostgreSQL Database
```bash
# Option 1: Using psql
createdb onlineshop

# Option 2: Using SQL
psql postgres
CREATE DATABASE onlineshop;
\q
```

### Run Schema
```bash
cd backend
psql onlineshop < database/schema.sql
```

### Verify Tables
```bash
psql onlineshop
\dt  # List tables
\q
```

---

## 2. Backend Environment Setup

### Create `.env` file
```bash
cd backend
cp .env.example .env
```

### Configure `.env`
```env
NODE_ENV=development
PORT=3000

# Database (update with your credentials)
DATABASE_URL=postgresql://user:password@localhost:5432/onlineshop

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Frontend URL
FRONTEND_URL=http://localhost:5173

# R2 (Optional for development)
# R2_ACCOUNT_ID=
# R2_ACCESS_KEY_ID=
# R2_SECRET_ACCESS_KEY=
# R2_BUCKET_NAME=
# R2_ENDPOINT=
# R2_PUBLIC_URL=
```

### Test Backend
```bash
cd backend
npm run dev
# Should see: Server running on http://localhost:3000
```

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

---

## 3. Frontend Environment Setup

### Create `.env` file
```bash
# In project root (onlineshop folder)
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

---

## 4. Start Development

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

---

## 5. Migrate Pages (Step by Step)

### Priority Order:
1. **Auth pages** (if any) - Login/Register
2. **Shop page** - Main products page
3. **Product details** - Single product view
4. **Profile page** - User profile
5. **Orders page** - User orders
6. **Favorites page** - User favorites
7. **Checkout page** - Order creation
8. **Admin pages** - Product management, etc.

### Migration Pattern:

#### Before (Base44 SDK):
```javascript
import { base44 } from "@/api/base44Client";

const { data: products } = useQuery({
  queryKey: ["products"],
  queryFn: () => base44.entities.Product.list("-created_date"),
});
```

#### After (New API):
```javascript
import { getProducts } from "@/api/products";

const { data } = useQuery({
  queryKey: ["products"],
  queryFn: () => getProducts({ sort: "-created_date" }),
});

const products = data?.products || [];
```

---

## 6. Remove Base44 SDK

### After Migration Complete:
1. Remove from package.json:
   ```bash
   npm uninstall @base44/sdk
   ```

2. Delete files:
   - `src/api/base44Client.js`
   - `src/api/entities.js`
   - `src/api/integrations.js`

3. Update imports:
   - Search for `base44` in codebase
   - Replace with new API functions

---

## 7. Testing Checklist

### Backend
- [ ] Health endpoint works
- [ ] Database connection works
- [ ] Auth endpoints work (register, login)
- [ ] Products endpoints work
- [ ] Orders endpoints work
- [ ] File upload works (if configured)

### Frontend
- [ ] API client connects to backend
- [ ] Login works
- [ ] Products load
- [ ] Orders work
- [ ] Favorites work
- [ ] All pages work

---

## 8. Deployment (When Ready)

### Backend (Render)
1. Push code to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

---

## 📚 Resources

- Backend README: `backend/README.md`
- Backend Status: `backend/BACKEND_STATUS.md`
- Frontend API Status: `FRONTEND_API_CLIENT_STATUS.md`
- API Endpoints Spec: `API_ENDPOINTS_SPEC.md`

---

**Ready to start migration!** 🚀

