"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addDays, format, isSameDay } from "date-fns";
import { getReservations } from "@/lib/data/reservations";
import { Reservation } from "@/types";

export default function ReservationsCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      customerName: "John Doe",
      date: new Date().toISOString(),
      time: "19:00",
      guests: 2,
      status: "CONFIRMED",
      tableNumber: "A1",
      specialRequests: "Window seat preferred",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      date: new Date().toISOString(),
      time: "20:00",
      guests: 4,
      status: "PENDING",
      tableNumber: "B3",
    },
    // Add more sample reservations as needed
  ]);

  // Function to get reservations for a specific date
  const getReservationsForDate = (date: Date) => {
    return reservations.filter((reservation) =>
      isSameDay(new Date(reservation.date), date)
    );
  };

  // Function to get the status color
  const getStatusColor = (status: string) => {
    const statusColors = {
      CONFIRMED: "bg-green-500",
      PENDING: "bg-yellow-500",
      CANCELLED: "bg-red-500",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-500";
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reservations Calendar</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[350px,1fr] gap-4">
        <Card>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              components={{
                DayContent: ({ date }) => {
                  const dayReservations = getReservationsForDate(date);
                  return (
                    <div className="relative w-full h-full">
                      <div>{date.getDate()}</div>
                      {dayReservations.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                          <Badge variant="secondary" className="text-xs">
                            {dayReservations.length}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Reservations for {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <div className="space-y-2">
                {getReservationsForDate(selectedDate).length === 0 ? (
                  <p className="text-muted-foreground">
                    No reservations for this date
                  </p>
                ) : (
                  getReservationsForDate(selectedDate)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center gap-4 p-3 rounded-lg border"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            reservation.status
                          )}`}
                        />
                        <div className="flex-1">
                          <div className="font-medium">
                            {reservation.customerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {reservation.time} • {reservation.guests} guests •
                            Table {reservation.tableNumber}
                          </div>
                        </div>
                        <Badge variant={reservation.status.toLowerCase()}>
                          {reservation.status}
                        </Badge>
                      </div>
                    ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}