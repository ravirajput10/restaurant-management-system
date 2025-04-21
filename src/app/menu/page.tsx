"use client";

import { Container } from "@/components/ui/container";
import { MenuSection } from "@/components/menu-section";
import { useState } from "react";
import { ProductDetailsModal } from "@/components/product-details-modal";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuCategories = [
  {
    name: "Starters",
    items: [
      {
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
        price: 8.99,
        image: "/images/bruschetta.jpg",
        category: "Starters"
      },
      {
        name: "Calamari Fritti",
        description: "Crispy fried squid served with marinara sauce and lemon wedges",
        price: 12.99,
        image: "/images/calamari.jpg",
        category: "Starters"
      },
      {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan cheese, croutons, and classic Caesar dressing",
        price: 10.99,
        image: "/images/caesar-salad.jpg",
        category: "Starters"
      }
    ]
  },
  {
    name: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon butter sauce, served with seasonal vegetables",
        price: 28.99,
        image: "/images/grilled-salmon.jpg",
        category: "Main Course"
      },
      {
        name: "Beef Wellington",
        description: "Premium beef tenderloin wrapped in puff pastry with mushroom duxelles",
        price: 34.99,
        image: "/images/beef-wellington.jpg",
        category: "Main Course"
      },
      {
        name: "Risotto ai Funghi",
        description: "Creamy Arborio rice with wild mushrooms, parmesan, and truffle oil",
        price: 24.99,
        image: "/images/mushroom-risotto.jpg",
        category: "Main Course"
      }
    ]
  },
  {
    name: "Desserts",
    items: [
      {
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: 9.99,
        image: "/images/tiramisu.jpg",
        category: "Dessert"
      },
      {
        name: "Chocolate Fondant",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 12.99,
        image: "/images/chocolate-fondant.jpg",
        category: "Dessert"
      },
      {
        name: "Crème Brûlée",
        description: "Rich vanilla custard topped with caramelized sugar",
        price: 10.99,
        image: "/images/creme-brulee.jpg",
        category: "Dessert"
      }
    ]
  }
];

export default function MenuPage() {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  return (
    <main className="flex-1">
      <div className="relative py-12 bg-gradient-to-b from-background to-secondary/20">
        <Container>
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">Our Menu</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Discover our carefully curated selection of dishes, prepared with the finest ingredients
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="space-y-16">
          {menuCategories.map((category) => (
            <MenuSection
              key={category.name}
              title={category.name}
              items={category.items}
              onItemClick={setSelectedProduct}
            />
          ))}
        </div>
      </Container>

      {selectedProduct && (
        <ProductDetailsModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </main>
  );
}

