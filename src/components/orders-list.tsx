"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ChefHat, Truck, CheckCircle2 } from "lucide-react";
import { TrackOrder } from "@/components/track-order";

// Mock data - replace with actual API calls
const orders = [
  {
    id: "ORD-001",
    date: "2024-02-20T19:00:00",
    status: "preparing",
    total: 45.97,
    items: [
      { name: "Grilled Salmon", quantity: 1, price: 28.99 },
      { name: "Caesar Salad", quantity: 1, price: 10.99 },
      { name: "Chocolate Fondant", quantity: 1, price: 5.99 }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-02-19T20:30:00",
    status: "delivered",
    total: 67.98,
    items: [
      { name: "Beef Wellington", quantity: 1, price: 34.99 },
      { name: "Bruschetta", quantity: 1, price: 8.99 },
      { name: "Calamari Fritti", quantity: 1, price: 12.99 },
      { name: "Chocolate Fondant", quantity: 2, price: 11.98 }
    ]
  },
  // Add more orders as needed
];

const statusMap = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/10 text-yellow-500" },
  preparing: { label: "Preparing", icon: ChefHat, color: "bg-blue-500/10 text-blue-500" },
  delivering: { label: "On the way", icon: Truck, color: "bg-purple-500/10 text-purple-500" },
  delivered: { label: "Delivered", icon: CheckCircle2, color: "bg-green-500/10 text-green-500" }
};

export function OrdersList() {
  const [activeTab, setActiveTab] = useState("current");
  const [trackingOrder, setTrackingOrder] = useState<typeof orders[0] | null>(null);

  const currentOrders = orders.filter(order => 
    ["pending", "preparing", "delivering"].includes(order.status)
  );
  const pastOrders = orders.filter(order => order.status === "delivered");

  const OrderCard = ({ order }: { order: typeof orders[0] }) => {
    const status = statusMap[order.status as keyof typeof statusMap];
    const StatusIcon = status.icon;

    return (
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{order.id}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <Badge variant="secondary" className={`flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="font-medium">Total</span>
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
            {order.status !== "delivered" && (
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => setTrackingOrder(order)}
              >
                Track Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Tabs defaultValue="current" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="current">Current Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          {currentOrders.length > 0 ? (
            currentOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No current orders
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            pastOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No past orders
            </div>
          )}
        </TabsContent>
      </Tabs>

      {trackingOrder && (
        <TrackOrder
          isOpen={!!trackingOrder}
          onClose={() => setTrackingOrder(null)}
          order={trackingOrder}
        />
      )}
    </>
  );
}