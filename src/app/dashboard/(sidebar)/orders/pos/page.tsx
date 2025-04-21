"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus, Trash2 } from "lucide-react";

// Mock menu data - in a real app, this would come from your API
const menuItems = [
  { id: "1", name: "Burger", price: 9.99, category: "Main Course" },
  { id: "2", name: "Pizza", price: 14.99, category: "Main Course" },
  { id: "3", name: "Pasta", price: 12.99, category: "Main Course" },
  { id: "4", name: "Caesar Salad", price: 8.99, category: "Starters" },
  { id: "5", name: "French Fries", price: 4.99, category: "Sides" },
  { id: "6", name: "Soda", price: 2.99, category: "Beverages" },
];

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function POSPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const addItemToOrder = (item: typeof menuItems[0]) => {
    setOrderItems((current) => {
      const existingItem = current.find((i) => i.id === item.id);
      if (existingItem) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setOrderItems((current) =>
      current
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setOrderItems((current) => current.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Menu Items Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex gap-2">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search menu items..."
            className="flex-1"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 overflow-auto">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:bg-accent"
              onClick={() => addItemToOrder(item)}
            >
              <CardContent className="p-4">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-[400px] flex flex-col gap-4 bg-card rounded-lg p-4">
        <h2 className="text-xl font-bold">Current Order</h2>
        
        <div className="flex-1 overflow-auto">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" size="lg">
            Complete Order (${calculateTotal().toFixed(2)})
          </Button>
        </div>
      </div>
    </div>
  );
}