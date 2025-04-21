"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function ReservationForm() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState<string>("2");

  const availableTimes = [
    { value: "17:00", label: "5:00 PM" },
    { value: "17:30", label: "5:30 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "19:30", label: "7:30 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "20:30", label: "8:30 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "21:30", label: "9:30 PM" }
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = {
      date,
      time,
      guests,
      name: event.currentTarget.name.value,
      email: event.currentTarget.email.value,
      phone: event.currentTarget.phone.value,
      specialRequests: event.currentTarget.specialRequests.value,
    };

    console.log("Reservation details:", formData);
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="space-y-1 px-6 py-8 bg-secondary/10 rounded-t-xl">
        <CardTitle className="text-2xl">Reservation Details</CardTitle>
        <CardDescription className="text-base">
          Please fill in your details to book a table
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Reservation DateTime Section */}
          <div className="space-y-4 p-4 bg-secondary/5 rounded-lg">
            <h3 className="font-medium text-lg">Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date && time 
                        ? `${format(date, "PPP")} at ${availableTimes.find(t => t.value === time)?.label}` 
                        : "Pick a date and time"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex flex-col sm:flex-row border-b">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                        initialFocus
                      />
                      <div className="border-l p-3 space-y-2 bg-secondary/5">
                        <div className="flex items-center gap-2 px-2 py-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">Available Times</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {availableTimes.map((t) => (
                            <Button
                              key={t.value}
                              variant={time === t.value ? "default" : "outline"}
                              className="text-sm"
                              onClick={() => setTime(t.value)}
                            >
                              {t.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm font-medium">Number of Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact Information</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-sm font-medium">Special Requests</Label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any dietary requirements or special requests?"
              />
            </div>
          </div>

          <Button type="submit" className="w-full text-base py-6">
            Confirm Reservation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}