import { MenuItemCard } from "@/components/menu-item-card";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

export function MenuSection({ title, items, onItemClick }: MenuSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuItemCard 
            key={item.name} 
            {...item} 
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
