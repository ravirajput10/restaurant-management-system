"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface Table {
  id: string;
  number: string;
  capacity: number;
  status: "available" | "reserved" | "occupied";
  reservation?: {
    customerName: string;
    time: string;
    guests: number;
  };
}

export default function TablesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tables, setTables] = useState<Table[]>([
    {
      id: "1",
      number: "A1",
      capacity: 2,
      status: "reserved",
      reservation: {
        customerName: "John Doe",
        time: "19:00",
        guests: 2,
      },
    },
    {
      id: "2",
      number: "A2",
      capacity: 4,
      status: "available",
    },
    {
      id: "3",
      number: "B1",
      capacity: 6,
      status: "occupied",
      reservation: {
        customerName: "Jane Smith",
        time: "18:30",
        guests: 5,
      },
    },
    // Add more tables as needed
  ]);

  const getStatusColor = (status: Table["status"]) => {
    const colors = {
      available: "bg-green-500",
      reserved: "bg-yellow-500",
      occupied: "bg-red-500",
    };
    return colors[status];
  };

  const getStatusBadge = (status: Table["status"]) => {
    const variants = {
      available: "success",
      reserved: "warning",
      occupied: "destructive",
    };
    return variants[status];
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Table Management</h1>
        <Button>Add New Table</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-4">
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
              <CardTitle>Tables Overview - {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <Card key={table.id} className="relative">
                    <div
                      className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(
                        table.status
                      )}`}
                    />
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Table {table.number}</CardTitle>
                        <Badge variant={getStatusBadge(table.status) as any}>
                          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">Capacity: {table.capacity} guests</div>
                        {table.reservation && (
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {table.reservation.customerName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {table.reservation.time} • {table.reservation.guests} guests
                            </div>
                          </div>
                        )}
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">
                            {table.status === "available" ? "Make Reservation" : "View Details"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {["available", "reserved", "occupied"].map((status) => (
                  <div key={status} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        status as Table["status"]
                      )}`}
                    />
                    <span className="text-sm capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}