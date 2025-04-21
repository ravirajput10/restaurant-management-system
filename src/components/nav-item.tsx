"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

export function NavItem({ href, icon: Icon, label, badge }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
          {badge}
        </span>
      )}
    </Link>
  );
}