import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: ProductDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="relative h-[300px] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="w-fit">
              {product.category}
            </Badge>
            <Badge variant="secondary" className="text-lg font-semibold">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}