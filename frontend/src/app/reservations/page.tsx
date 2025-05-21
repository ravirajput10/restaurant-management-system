import { Container } from "@/components/ui/container";
import { ReservationForm } from "@/components/reservation-form";

export default function ReservationsPage() {
  return (
    <main className="flex-1">
      <div className="relative py-12 bg-gradient-to-b from-background to-secondary/20">
        <Container>
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter">Make a Reservation</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Reserve your table now and experience our exceptional cuisine and service
            </p>
          </div>
        </Container>
      </div>  

      <Container>
        <div className="relative -mt-8 pb-16">
          <div className="max-w-2xl mx-auto">
            <ReservationForm />
          </div>
        </div>
      </Container>
    </main>
  );
}