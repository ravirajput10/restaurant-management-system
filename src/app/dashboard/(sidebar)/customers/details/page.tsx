"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  CreditCard, 
  Edit, 
  MessageSquare 
} from "lucide-react";

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "inactive" | "new";
  tags: string[];
  preferences: {
    favoriteItems: string[];
    dietaryRestrictions: string[];
    seatingPreference: string;
  };
  notes: string;
}

interface OrderHistory {
  id: string;
  orderNumber: string;
  date: string;
  items: string[];
  total: number;
  status: string;
  type: string;
}

export default function CustomerDetailsPage() {
  const [customer, setCustomer] = useState<CustomerDetails>({
    id: "CUST001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    joinDate: "2022-03-15",
    totalOrders: 12,
    totalSpent: 345.67,
    lastOrderDate: "2023-06-15",
    status: "active",
    tags: ["regular", "dine-in"],
    preferences: {
      favoriteItems: ["Margherita Pizza", "Caesar Salad", "Tiramisu"],
      dietaryRestrictions: ["No nuts"],
      seatingPreference: "Window seat",
    },
    notes: "Prefers to be seated away from kitchen. Usually tips well.",
  });

  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([
    {
      id: "ORD001",
      orderNumber: "ORD-12345",
      date: "2023-06-15",
      items: ["Margherita Pizza", "Caesar Salad", "Soda"],
      total: 42.99,
      status: "Completed",
      type: "Dine-in",
    },
    {
      id: "ORD002",
      orderNumber: "ORD-12289",
      date: "2023-05-22",
      items: ["Pepperoni Pizza", "Garlic Bread", "Beer"],
      total: 38.50,
      status: "Completed",
      type: "Takeout",
    },
    {
      id: "ORD003",
      orderNumber: "ORD-12100",
      date: "2023-04-10",
      items: ["Pasta Carbonara", "Tiramisu", "Wine"],
      total: 56.75,
      status: "Completed",
      type: "Dine-in",
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Details</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Message
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[350px,1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2 pb-4 border-b">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <div className="flex flex-wrap gap-1">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{customer.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Customer Since</p>
                  <p className="text-sm text-muted-foreground">{formatDate(customer.joinDate)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Total Orders</p>
                  </div>
                  <p className="text-2xl font-bold">{customer.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">
                    Last order on {formatDate(customer.lastOrderDate)}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Total Spent</p>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(customer.totalSpent)}</p>
                  <p className="text-sm text-muted-foreground">
                    Avg. {formatCurrency(customer.totalSpent / customer.totalOrders)} per order
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Status</p>
                  </div>
                  <div>
                    <Badge variant="success" className="text-sm">
                      {customer.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="orders">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>{order.items.join(", ")}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>{order.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Favorite Items</h3>
                    <div className="flex flex-wrap gap-2">
                      {customer.preferences.favoriteItems.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Dietary Restrictions</h3>
                    <div className="flex flex-wrap gap-2">
                      {customer.preferences.dietaryRestrictions.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Seating Preference</h3>
                    <p className="text-sm">{customer.preferences.seatingPreference}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <Card