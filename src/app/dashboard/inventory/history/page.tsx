"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StockHistoryPage() {
  const stockHistory = [
    {
      id: 1,
      itemName: "Tomatoes",
      type: "Stock In",
      quantity: 50,
      date: "2024-01-15",
      user: "John Doe",
    },
    {
      id: 2,
      itemName: "Chicken Breast",
      type: "Stock Out",
      quantity: -10,
      date: "2024-01-14",
      user: "Jane Smith",
    },
    // Add more history items as needed
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock History</h1>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search items..."
          className="max-w-xs"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="in">Stock In</SelectItem>
            <SelectItem value="out">Stock Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Updated By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell className="font-medium">{record.itemName}</TableCell>
                <TableCell>
                  <span className={record.type === "Stock In" ? "text-green-600" : "text-red-600"}>
                    {record.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={record.type === "Stock In" ? "text-green-600" : "text-red-600"}>
                    {record.type === "Stock In" ? "+" : ""}{record.quantity}
                  </span>
                </TableCell>
                <TableCell>{record.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}