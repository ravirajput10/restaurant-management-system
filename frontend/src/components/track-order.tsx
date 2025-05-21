"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Truck, CheckCircle2, MapPin, Timer } from "lucide-react";
import { orderTrackingService, type OrderUpdate } from "@/lib/order-tracking-service";
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map'), { ssr: false });

interface OrderStep {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: any;
  status: "completed" | "current" | "upcoming";
}

interface TrackOrderProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    status: string;
    estimatedDelivery?: string;
    currentLocation?: string;
    steps?: OrderStep[];
  };
}

export function TrackOrder({ isOpen, onClose, order }: TrackOrderProps) {
  const [orderStatus, setOrderStatus] = useState(order);
  const [deliveryLocation, setDeliveryLocation] = useState(order.location);

  useEffect(() => {
    if (isOpen) {
      const handleUpdate = (update: OrderUpdate) => {
        setOrderStatus(prev => ({ ...prev, ...update }));
        if (update.location) {
          setDeliveryLocation(update.location);
        }
      };

      orderTrackingService.trackOrder(order.id, handleUpdate);

      return () => {
        orderTrackingService.stopTracking(order.id);
      };
    }
  }, [isOpen, order.id]);

  // This would normally come from your backend
  const orderSteps: OrderStep[] = [
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been received",
      time: "6:30 PM",
      icon: Clock,
      status: "completed",
    },
    {
      id: "preparing",
      title: "Preparing",
      description: "Your food is being prepared",
      time: "6:35 PM",
      icon: ChefHat,
      status: order.status === "preparing" ? "current" : 
             order.status === "delivering" ? "completed" : "upcoming",
    },
    {
      id: "delivering",
      title: "On the Way",
      description: "Your order is on the way",
      time: "6:50 PM",
      icon: Truck,
      status: order.status === "delivering" ? "current" : 
             order.status === "delivered" ? "completed" : "upcoming",
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Enjoy your meal!",
      time: "7:15 PM",
      icon: CheckCircle2,
      status: order.status === "delivered" ? "completed" : "upcoming",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Track Order {orderStatus.id}
          </DialogTitle>
        </DialogHeader>

        {/* Map View (show only when delivering) */}
        {orderStatus.status === "delivering" && deliveryLocation && (
          <div className="h-[200px] rounded-lg overflow-hidden mb-6">
            <Map
              deliveryLocation={deliveryLocation}
              restaurantLocation={order.restaurantLocation}
            />
          </div>
        )}

        {/* Estimated Delivery Time */}
        <div className="bg-secondary/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-lg font-semibold">
                  {deliveryLocation?.estimatedArrival || orderStatus.estimatedDelivery}
                </p>
              </div>
            </div>
            {orderStatus.status === "delivering" && deliveryLocation && (
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Current Location</p>
                  <p className="text-lg font-semibold">
                    {deliveryLocation.distanceInKm.toFixed(1)} km away
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryLocation.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Progress */}
        <div className="space-y-6">
          {orderSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < orderSteps.length - 1 && (
                <div
                  className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%+24px)] 
                    ${
                      step.status === "completed"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                />
              )}

              {/* Step Content */}
              <div className="flex gap-4">
                {/* Status Icon */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                    ${
                      step.status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : step.status === "current"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>

                {/* Step Details */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{step.title}</p>
                    <span className="text-sm text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onClose()}
          >
            Close
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              window.location.href = `tel:${process.env.NEXT_PUBLIC_SUPPORT_PHONE}`;
            }}
          >
            Contact Support
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
