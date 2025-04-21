import { Container } from "@/components/ui/container";
import { OrdersList } from "@/components/orders-list";

export default function OrdersPage() {
  return (
    <main className="flex-1">
      <div className="relative py-12 bg-gradient-to-b from-background to-secondary/20">
        <Container>
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">My Orders</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Track and manage your current and past orders
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <OrdersList />
      </Container>
    </main>
  );
}