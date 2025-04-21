"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  tags: string[];
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      category: "Pizza",
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      ingredients: [
        { name: "Pizza Dough", amount: 1, unit: "piece" },
        { name: "Tomato Sauce", amount: 200, unit: "ml" },
        { name: "Mozzarella", amount: 200, unit: "g" },
        { name: "Fresh Basil", amount: 10, unit: "leaves" },
        { name: "Olive Oil", amount: 2, unit: "tbsp" },
      ],
      instructions: [
        "Preheat oven to 450°F (230°C)",
        "Roll out pizza dough",
        "Spread tomato sauce evenly",
        "Add torn mozzarella pieces",
        "Bake for 12-15 minutes",
        "Add fresh basil leaves and drizzle olive oil",
      ],
      tags: ["vegetarian", "italian", "classic"],
    },
    {
      id: "2",
      name: "Classic Beef Burger",
      category: "Burgers",
      prepTime: 15,
      cookTime: 10,
      servings: 4,
      ingredients: [
        { name: "Ground Beef", amount: 500, unit: "g" },
        { name: "Salt", amount: 1, unit: "tsp" },
        { name: "Black Pepper", amount: 1, unit: "tsp" },
        { name: "Burger Buns", amount: 4, unit: "pieces" },
        { name: "Lettuce", amount: 4, unit: "leaves" },
      ],
      instructions: [
        "Form beef into 4 equal patties",
        "Season with salt and pepper",
        "Grill for 4-5 minutes each side",
        "Toast the buns",
        "Assemble with lettuce and preferred toppings",
      ],
      tags: ["beef", "grill", "classic"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Button>Add New Recipe</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {recipe.name}
                <Badge variant="outline">{recipe.category}</Badge>
              </CardTitle>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>Prep: {recipe.prepTime}min</span>
                <span>•</span>
                <span>Cook: {recipe.cookTime}min</span>
                <span>•</span>
                <span>Serves: {recipe.servings}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}