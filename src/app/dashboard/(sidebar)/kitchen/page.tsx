"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/utils";

interface KitchenOrder {
  id: string;
  orderNumber: string;
  tableNumber: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    notes?: string;
    status: "PENDING" | "PREPARING" | "READY";
  }[];
  priority: "NORMAL" | "HIGH" | "RUSH";
  createdAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>([
    {
      id: "1",
      orderNumber: "ORD-001",
      tableNumber: "A1",
      items: [
        {
          id: "1",
          name: "Margherita Pizza",
          quantity: 2,
          notes: "Extra cheese",
          status: "PENDING",
        },
        {
          id: "2",
          name: "Caesar Salad",
          quantity: 1,
          status: "PREPARING",
        },
      ],
      priority: "HIGH",
      createdAt: new Date().toISOString(),
      status: "NEW",
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      tableNumber: "B3",
      items: [
        {
          id: "3",
          name: "Beef Burger",
          quantity: 1,
          notes: "Medium rare",
          status: "PENDING",
        },
        {
          id: "4",
          name: "French Fries",
          quantity: 1,
          status: "PENDING",
        },
      ],
      priority: "NORMAL",
      createdAt: new Date().toISOString(),
      status: "NEW",
    },
  ]);

  const getPriorityColor = (priority: KitchenOrder["priority"]) => {
    const colors = {
      NORMAL: "default",
      HIGH: "warning",
      RUSH: "destructive",
    };
    return colors[priority];
  };

  const getItemStatusColor = (status: KitchenOrder["items"][0]["status"]) => {
    const colors = {
      PENDING: "default",
      PREPARING: "warning",
      READY: "success",
    };
    return colors[status];
  };

  const updateItemStatus = (orderId: string, itemId: string, newStatus: KitchenOrder["items"][0]["status"]) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          }),
        };
      }
      return order;
    }));
  };

  const updateOrderStatus = (orderId: string, newStatus: KitchenOrder["status"]) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kitchen Orders Queue</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Order #{order.orderNumber}
                </CardTitle>
                <Badge variant={getPriorityColor(order.priority)}>
                  {order.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Table {order.tableNumber}</span>
                <span>•</span>
                <span>{formatTime(order.createdAt)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {item.quantity}x {item.name}
                        </span>
                        <Badge variant={getItemStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {item.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItemStatus(order.id, item.id, "PREPARING")}
                        >
                          Start
                        </Button>
                      )}
                      {item.status === "PREPARING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItemStatus(order.id, item.id, "READY")}
                        >
                          Ready
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                {order.status === "NEW" && (
                  <Button
                    variant="outline"
                    onClick={() => updateOrderStatus(order.id, "IN_PROGRESS")}
                  >
                    Start Order
                  </Button>
                )}
                {order.status === "IN_PROGRESS" && (
                  <Button
                    variant="outline"
                    onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                  >
                    Complete Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
