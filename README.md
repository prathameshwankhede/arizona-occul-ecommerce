# Arizona Occul

> **Better Energy • Better Life • Better You**

A production-ready spiritual consultation and e-commerce platform built with Next.js, TypeScript, Prisma, and MySQL.

**Consultant:** Dr. Preity  
**WhatsApp:** [8390125338](https://wa.me/8390125338)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | MySQL via Prisma ORM v5 |
| Authentication | JWT (jose) + bcryptjs + HTTP-only cookies |
| Validation | Zod |
| Forms | React Hook Form |
| Images | Cloudinary-ready (URL stored in MySQL) |
| Icons | Lucide React |
| Deployment | Hostinger Node.js Web App |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+ database
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prathameshwankhede/arizona-occul-ecommerce.git
   cd arizona-occul-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. **Set up database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/arizona_occul"
AUTH_SECRET="your-secret-min-32-chars"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="8390125338"
```

---

## Project Structure

```
/
├── app/
│   ├── (public)/       # Public layout pages
│   ├── (auth)/         # Login/Register
│   ├── services/       # Service pages
│   ├── shop/           # Product listing + detail
│   ├── cart/           # Cart page
│   ├── checkout/       # Checkout + success
│   ├── consultation/   # Consultation booking
│   ├── account/        # Customer dashboard
│   ├── admin/          # Admin panel
│   └── api/            # API routes
├── components/
│   ├── layout/         # Header, Footer, etc.
│   ├── ui/             # Reusable UI components
│   ├── home/           # Home page sections
│   ├── products/       # Product components
│   ├── services/       # Service components
│   ├── cart/           # Cart components
│   ├── account/        # Account components
│   └── admin/          # Admin components
├── lib/
│   ├── prisma.ts       # Prisma client
│   ├── auth.ts         # JWT auth helpers
│   ├── validations/    # Zod schemas
│   └── utils/          # Utilities
├── prisma/
│   └── schema.prisma   # Database schema
├── types/
│   └── index.ts        # Shared TypeScript types
├── hooks/              # React hooks
├── middleware.ts        # Route protection
└── .env.example        # Environment template
```

---

## Database Schema

8 core tables: `users`, `categories`, `services`, `products`, `cart_items`, `orders`, `order_items`, `consultations`

Run migrations:
```bash
npx prisma migrate dev --name init
```

Seed an admin user (optional):
```bash
npx prisma studio  # GUI for database
```

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## API Routes

### Auth
- `POST /api/auth/register` — Register new customer
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET  /api/auth/me` — Current user

### Products
- `GET /api/products` — List products (filter, search, paginate)
- `GET /api/products/[slug]` — Product detail

### Cart (authenticated)
- `GET    /api/cart` — Get cart
- `POST   /api/cart/items` — Add item
- `PUT    /api/cart/items/[id]` — Update quantity
- `DELETE /api/cart/items/[id]` — Remove item
- `DELETE /api/cart` — Clear cart

### Orders (authenticated)
- `POST /api/orders` — Place order
- `GET  /api/orders/my-orders` — My orders
- `GET  /api/orders/[id]` — Order detail
- `PATCH /api/orders/[id]/cancel` — Cancel order

### Admin (ADMIN role required)
- `GET /api/admin/dashboard` — Stats
- `GET/POST /api/admin/products` — Manage products
- `GET/POST /api/admin/categories` — Manage categories
- `GET/POST /api/admin/services` — Manage services
- `GET /api/admin/orders` — View orders
- `PATCH /api/admin/orders/[id]` — Update order status
- `GET /api/admin/customers` — View customers
- `GET /api/admin/consultations` — View consultations
- `PATCH /api/admin/consultations/[id]` — Update consultation status

---

## Security

- ✅ bcrypt password hashing (cost factor: 12)
- ✅ JWT in HTTP-only, SameSite cookies
- ✅ Middleware-based route protection
- ✅ Zod server-side validation on all inputs
- ✅ Prisma ORM (SQL injection prevention)
- ✅ Secure headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Role-based access control (CUSTOMER | ADMIN)
- ✅ No secrets in source code

---

## Deployment (Hostinger)

1. Build the application: `npm run build`
2. Set environment variables in Hostinger panel
3. Start: `npm run start`

---

## Phase 2 (Future)
- Razorpay payment gateway
- SMS/WhatsApp automation
- Advanced analytics
- Astrology report generator
- Video consultation
- Mobile application

---

*Arizona Occul — Spiritual wellness for a better you ✦*
