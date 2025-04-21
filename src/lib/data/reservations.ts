import { Reservation } from "@/types";

export async function getReservations(): Promise<Reservation[]> {
  // In a real application, this would fetch from your API
  return [
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
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      time: "20:00",
      guests: 4,
      status: "PENDING",
      tableNumber: "B3",
    },
    {
      id: "3",
      customerName: "Mike Johnson",
      date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      time: "18:30",
      guests: 6,
      status: "CONFIRMED",
      tableNumber: "C2",
      specialRequests: "Birthday celebration",
    },
  ];
}