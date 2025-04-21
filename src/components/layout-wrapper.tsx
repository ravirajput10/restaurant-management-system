'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { usePathname } from 'next/navigation';

const noHeaderFooterPaths = [
  '/dashboard',
  '/login', 
  '/signup',
];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if the current path starts with /dashboard
  const isDashboardPath = pathname.startsWith('/dashboard');
  const showHeaderFooter = !noHeaderFooterPaths.includes(pathname) && !isDashboardPath;

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
