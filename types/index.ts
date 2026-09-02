// ─────────────────────────────────────────
// ARIZONA OCCUL — SHARED TYPES
// ─────────────────────────────────────────

export type Role = "CUSTOMER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";
export type CategoryStatus = "ACTIVE" | "INACTIVE";
export type ServiceStatus = "ACTIVE" | "INACTIVE";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "COD" | "PAID" | "FAILED" | "REFUNDED";
export type ConsultationStatus =
  | "NEW"
  | "CONTACTED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

// ─── Auth ───────────────────────────────

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// ─── User ───────────────────────────────

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  status: UserStatus;
  createdAt: string;
}

// ─── Category ───────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
  createdAt: string;
  _count?: { products: number };
}

// ─── Service ────────────────────────────

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string | null;
  image: string | null;
  status: ServiceStatus;
  sortOrder: number;
  createdAt: string;
}

// ─── Product ────────────────────────────

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  sku: string | null;
  description: string;
  price: string;
  salePrice: string | null;
  stock: number;
  image: string | null;
  status: ProductStatus;
  createdAt: string;
  category?: Category;
}

// ─── Cart ───────────────────────────────

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
  createdAt: string;
}

// ─── Order ──────────────────────────────

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  subtotal: string;
  shipping: string;
  discount: string;
  total: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  total: string;
  product?: Product;
}

// ─── Consultation ───────────────────────

export interface Consultation {
  id: number;
  userId: number | null;
  serviceId: number | null;
  name: string;
  phone: string;
  email: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: ConsultationStatus;
  createdAt: string;
  service?: Service;
}

// ─── API Response ───────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Admin Dashboard ────────────────────

export interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  consultationRequests: number;
  totalRevenue: string;
}
