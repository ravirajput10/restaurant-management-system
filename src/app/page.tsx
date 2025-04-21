import { Utensils, Clock, Star, Phone } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { FeatureCard } from "@/components/feature-card";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const features = [
  {
    icon: Utensils,
    title: "Quality Cuisine",
    description: "Experience the finest dishes prepared by our expert chefs using premium ingredients.",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Enjoy prompt and efficient service without compromising on quality.",
  },
  {
    icon: Star,
    title: "Best Experience",
    description: "Immerse yourself in an atmosphere of elegance and comfort.",
  },
  {
    icon: Phone,
    title: "Easy Booking",
    description: "Reserve your table quickly and easily through our online system.",
  },
];

const featuredMenuItems = [
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
    price: 28.99,
    image: "/images/grilled-salmon.jpg",
    category: "Main Course",
  },
  {
    name: "Beef Wellington",
    description: "Premium beef tenderloin wrapped in puff pastry",
    price: 34.99,
    image: "/images/beef-wellington.jpg",
    category: "Main Course",
  },
  {
    name: "Chocolate Fondant",
    description: "Warm chocolate cake with a molten center",
    price: 12.99,
    image: "/images/chocolate-fondant.jpg",
    category: "Dessert",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20 bg-secondary/20">
        <Container>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-center">Featured Menu</h2>
            <p className="text-muted-foreground text-center mt-4 mb-8">
              Discover our chef's specially curated dishes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMenuItems.map((item) => (
              <MenuItemCard key={item.name} {...item} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Experience Our Cuisine?</h2>
            <p className="text-lg max-w-[600px]">
              Book your table now and enjoy an unforgettable dining experience
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/reservations">Make a Reservation</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}