import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out our service",
    features: [
      "Basic menu access",
      "Table reservations",
      "Email support",
      "Basic order tracking",
      "Standard delivery options",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    href: "/signup",
  },
  {
    name: "Pro",
    price: "29",
    description: "Ideal for regular customers",
    features: [
      "All Free features",
      "Priority reservations",
      "24/7 phone support",
      "Advanced order tracking",
      "Priority delivery",
      "Exclusive menu items",
      "Monthly special offers",
    ],
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Advanced",
    price: "99",
    description: "For the ultimate dining experience",
    features: [
      "All Pro features",
      "VIP reservations",
      "Dedicated support manager",
      "Real-time order tracking",
      "Free premium delivery",
      "Exclusive chef's table access",
      "Private dining events",
      "Customized menu options",
      "Annual wine tasting event",
    ],
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
    href: "/signup?plan=advanced",
  },
];

export default function PricingPage() {
  return (
    <main className="flex-1">
      <div className="relative py-12 bg-gradient-to-b from-background to-secondary/20">
        <Container>
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Choose the perfect plan for your dining needs
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="relative -mt-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-6 bg-card rounded-xl border ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary px-3 py-1 text-xs rounded-full text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex-1">
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  variant={plan.buttonVariant}
                  className="mt-8 w-full"
                  size="lg"
                >
                  <Link href={plan.href}>{plan.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}