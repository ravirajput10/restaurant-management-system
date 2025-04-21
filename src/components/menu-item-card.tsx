import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  onClick?: () => void;
}

export function MenuItemCard({ name, description, price, image, category, onClick }: MenuItemCardProps) {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer" 
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary" className="font-semibold">
            ${price.toFixed(2)}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
