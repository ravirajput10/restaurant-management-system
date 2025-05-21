import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Restaurant MS</h3>
            <p className="text-sm text-muted-foreground">
              Providing quality dining experience since 2024
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">
                Menu
              </Link>
              <Link href="/reservations" className="text-sm text-muted-foreground hover:text-primary">
                Book a Table
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact Info</h4>
            <div className="text-sm text-muted-foreground">
              <p>123 Restaurant Street</p>
              <p>City, State 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@restaurantms.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Restaurant Management System. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}