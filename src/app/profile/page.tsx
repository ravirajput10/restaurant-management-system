"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Save, Upload, Calendar, ShoppingBag, Heart } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    avatar: "/avatars/shadcn.jpg",
    address: "123 Main St, Anytown, USA",
    favoriteItems: ["Margherita Pizza", "Caesar Salad", "Tiramisu"],
  });

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2023-09-15",
      status: "DELIVERED",
      total: 45.99,
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 15.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Tiramisu", quantity: 1, price: 5.99 },
      ],
    },
    {
      id: "ORD-002",
      date: "2023-09-10",
      status: "DELIVERED",
      total: 32.50,
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 17.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
        { name: "Cheesecake", quantity: 1, price: 6.99 },
      ],
    },
    {
      id: "ORD-003",
      date: "2023-09-05",
      status: "DELIVERED",
      total: 28.99,
      items: [
        { name: "Vegetarian Pizza", quantity: 1, price: 16.99 },
        { name: "Greek Salad", quantity: 1, price: 7.99 },
        { name: "Soda", quantity: 2, price: 1.99 },
      ],
    },
  ]);

  const [reservations, setReservations] = useState([
    {
      id: "RES-001",
      date: "2023-09-20",
      time: "19:00",
      guests: 2,
      status: "CONFIRMED",
      tableNumber: "A1",
    },
    {
      id: "RES-002",
      date: "2023-08-15",
      time: "20:00",
      guests: 4,
      status: "COMPLETED",
      tableNumber: "B3",
    },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    // Save profile logic here
    console.log("Profile saved:", profile);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Change Photo
                  </Button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </form>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-500" /> Favorite Items
                  </h3>
                  <ul className="space-y-1">
                    {profile.favoriteItems.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders" className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Order History
                </TabsTrigger>
                <TabsTrigger value="reservations" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Reservations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View your past orders and their details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              {new Date(order.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              ${order.total.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reservations" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservations</CardTitle>
                    <CardDescription>
                      View your upcoming and past reservations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reservation ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">
                              {reservation.id}
                            </TableCell>
                            <TableCell>
                              {new Date(reservation.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{reservation.time}</TableCell>
                            <TableCell>{reservation.guests}</TableCell>
                            <TableCell>
                              <Badge
                                className={getStatusColor(reservation.status)}
                              >
                                {reservation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/reservations">Make a Reservation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}