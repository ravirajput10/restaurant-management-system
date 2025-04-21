import { DataTable } from "@/components/ui/data-table";
import { reservationColumns } from "./columns";
import { getReservations } from "@/lib/data/reservations";

export default async function ReservationsPage() {
  const reservations = await getReservations();
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reservations</h1>
      </div>
      <DataTable columns={reservationColumns} data={reservations} />
    </div>
  );
}
