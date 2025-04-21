"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Home,
  MenuIcon,
  CalendarRange,
  ShoppingBag,
  User,
  Bell,
  DollarSign,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { MobileMenu } from '@/components/mobile-menu';
import { NavItem } from '@/components/nav-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Restaurant MS</span>
            </Link>

            <nav className="hidden lg:flex gap-1">
              {/* <NavItem href="/" icon={Home} label="Home" /> */}
              <NavItem href="/menu" icon={MenuIcon} label="Menu" />
              <NavItem href="/reservations" icon={CalendarRange} label="Reservations" />
              <NavItem href="/orders" icon={ShoppingBag} label="My Orders" badge={3} />
              <NavItem href="/pricing" icon={DollarSign} label="Pricing" />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <MobileMenu />

            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Reservations</DropdownMenuItem>
                  <DropdownMenuItem>Order History</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
