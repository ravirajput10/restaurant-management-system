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
import { format, addDays, startOfWeek } from "date-fns";

interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "in-progress" | "completed" | "absent";
}

export default function SchedulesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "SHIFT001",
      employeeId: "EMP001",
      employeeName: "John Smith",
      position: "Head Chef",
      date: new Date().toISOString(),
      startTime: "08:00",
      endTime: "16:00",
      status: "scheduled",
    },
    {
      id: "SHIFT002",
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      position: "Sous Chef",
      date: new Date().toISOString(),
      startTime: "10:00",
      endTime: "18:00",
      status: "scheduled",
    },
    {
      id: "SHIFT003",
      employeeId: "EMP003",
      employeeName: "Michael Brown",
      position: "Server",
      date: new Date().toISOString(),
      startTime: "16:00",
      endTime: "23:00",
      status: "scheduled",
    },
    {
      id: "SHIFT004",
      employeeId: "EMP004",
      employeeName: "Emily Davis",
      position: "Bartender",
      date: addDays(new Date(), 1).toISOString(),
      startTime: "16:00",
      endTime: "00:00",
      status: "scheduled",
    },
  ]);

  const getShiftsForDate = (date: Date) => {
    return shifts.filter(
      (shift) => format(new Date(shift.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "scheduled":
        return "secondary";
      case "in-progress":
        return "warning";
      case "completed":
        return "success";
      case "absent":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const currentShifts = getShiftsForDate(selectedDate);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Schedules</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Create Schedule</Button>
        </div>
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

        <Card>
          <CardHeader>
            <CardTitle>Shifts for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentShifts.length > 0 ? (
              <div className="space-y-4">
                {currentShifts.map((shift) => (
                  <Card key={shift.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{shift.employeeName}</h3>
                        <Badge variant={getStatusBadgeVariant(shift.status)}>
                          {shift.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {shift.position}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {shift.startTime} - {shift.endTime}
                        </span>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No shifts scheduled for this date.
                <div className="mt-2">
                  <Button variant="outline">Add Shift</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}