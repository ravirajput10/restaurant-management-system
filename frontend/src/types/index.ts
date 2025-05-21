export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Reservation {
  id: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  tableNumber: string;
  specialRequests?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalOrders: number;
  lastVisit: string;
}

export interface AnalyticsData {
  dailySales: number;
  monthlyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
}

export interface FinanceRecord {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  description: string;
}