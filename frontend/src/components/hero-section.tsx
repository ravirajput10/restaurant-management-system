import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative py-24 bg-gradient-to-b from-background to-secondary/20">
      <Container>
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Experience Fine Dining at its Best
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
            Discover our exquisite menu, make reservations, and enjoy an unforgettable dining experience.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/reservations">Book a Table</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}