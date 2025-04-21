import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "../columns";
import { getOrderHistory } from "@/lib/data/orders";

export default async function OrderHistoryPage() {
  const orders = await getOrderHistory();
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order History</h1>
      </div>
      <DataTable columns={orderColumns} data={orders} />
    </div>
  );
}