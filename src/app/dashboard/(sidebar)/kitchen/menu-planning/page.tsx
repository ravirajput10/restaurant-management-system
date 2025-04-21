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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
}

interface MenuPlan {
  date: string;
  items: {
    lunch: MenuItem[];
    dinner: MenuItem[];
  };
}

export default function MenuPlanningPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [menuPlans, setMenuPlans] = useState<MenuPlan[]>([
    {
      date: new Date().toISOString(),
      items: {
        lunch: [
          {
            id: "1",
            name: "Margherita Pizza",
            category: "Pizza",
            price: 14.99,
            description: "Fresh tomatoes, mozzarella, and basil",
            available: true,
          },
          {
            id: "2",
            name: "Caesar Salad",
            category: "Salads",
            price: 8.99,
            description: "Romaine lettuce, croutons, parmesan",
            available: true,
          },
        ],
        dinner: [
          {
            id: "3",
            name: "Beef Burger",
            category: "Burgers",
            price: 16.99,
            description: "Premium beef patty with fresh toppings",
            available: true,
          },
          {
            id: "4",
            name: "Pasta Carbonara",
            category: "Pasta",
            price: 15.99,
            description: "Creamy sauce with pancetta",
            available: true,
          },
        ],
      },
    },
  ]);

  const getMenuPlanForDate = (date: Date) => {
    return menuPlans.find(
      (plan) => format(new Date(plan.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const currentPlan = getMenuPlanForDate(selectedDate);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Menu Planning</h1>
        <Button>Create New Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[350px,1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Plan for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentPlan ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Lunch Menu</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {currentPlan.items.lunch.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                              <Badge variant={item.available ? "success" : "destructive"}>
                                {item.available ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3">Dinner Menu</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {currentPlan.items.dinner.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                              <Badge variant={item.available ? "success" : "destructive"}>
                                {item.available ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No menu plan created for this date.
                  <div className="mt-2">
                    <Button variant="outline">Create Plan</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}