"use client";

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  MenuIcon,
  CalendarRange,
  ShoppingBag,
  Bell,
  User,
  LogOut,
  Clock,
  DollarSign
} from 'lucide-react';
import { NavItem } from '@/components/nav-item';

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Restaurant MS</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-1">
            {/* <NavItem href="/" icon={Home} label="Home" /> */}
            <NavItem href="/menu" icon={MenuIcon} label="Menu" />
            <NavItem href="/pricing" icon={DollarSign} label="Pricing" />
            <NavItem href="/reservations" icon={CalendarRange} label="Reservations" />
            <NavItem href="/orders" icon={ShoppingBag} label="My Orders" badge={3} />
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="justify-start">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              <span className="ml-auto bg-destructive/10 text-destructive px-2 py-0.5 rounded-full text-xs">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="justify-start">
              <Clock className="h-5 w-5 mr-2" />
              Order History
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-destructive">
              <LogOut className="h-5 w-5 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

