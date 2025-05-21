"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Reservation } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const reservationColumns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return formatDate(date);
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "guests",
    header: "Guests",
  },
  {
    accessorKey: "tableNumber",
    header: "Table",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant={status.toLowerCase()}>{status}</Badge>;
    },
  },
  {
    accessorKey: "specialRequests",
    header: "Special Requests",
  },
];