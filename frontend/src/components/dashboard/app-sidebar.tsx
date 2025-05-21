"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Package,
  BoxesIcon,
  PlusCircle,
  History,
  // Command,
  // AudioWaveform,
  // GalleryVerticalEnd,
  ShoppingCart,
  CalendarRange,
  Utensils,
  Users,
  Users2,
  BarChart3,
  DollarSign,
  Settings,
} from "lucide-react";

import Image from "next/image";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavUser } from "@/components/dashboard/nav-user";
// import { NavSecondary } from "@/components/dashboard/nav-secondary";
// import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  // const searchParams = useSearchParams();
  const { navMainItems, navProjectItems } = getSideBarItems(path);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src="/assets/images/logo-ravi-rajput.jpg"
                    alt="Brand Logo"
                    className="rounded-full"
                    priority
                    width={32}
                    height={32}
                  />
                </div>
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {"Restaurant MS"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavProjects projects={navProjectItems} />
        {/* <NavSecondary items={navSecondaryItems} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// This is sample data.
const getSideBarItems = (path: string) => {
  const navMainItems = [
    // Existing Inventory Section
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: Package,
      isActive: path.startsWith('/dashboard/inventory'),
      items: [
        { title: "All Items", url: "/dashboard/inventory" },
        { title: "Categories", url: "/dashboard/inventory/categories" },
        { title: "Stock History", url: "/dashboard/inventory/history" },
        { title: "Settings", url: "/dashboard/inventory/settings" },
      ],
    },
    // New Sections
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
      isActive: path.startsWith('/dashboard/orders'),
      items: [
        { title: "Active Orders", url: "/dashboard/orders" },
        { title: "Order History", url: "/dashboard/orders/history" },
        { title: "POS", url: "/dashboard/orders/pos" },
        { title: "Settings", url: "/dashboard/orders/settings" },
      ],
    },
    {
      title: "Reservations",
      url: "/dashboard/reservations",
      icon: CalendarRange,
      isActive: path.startsWith('/dashboard/reservations'),
      items: [
        { title: "All Bookings", url: "/dashboard/reservations" },
        { title: "Calendar", url: "/dashboard/reservations/calendar" },
        { title: "Tables", url: "/dashboard/reservations/tables" },
        { title: "Settings", url: "/dashboard/reservations/settings" },
      ],
    },
    {
      title: "Kitchen",
      url: "/dashboard/kitchen",
      icon: Utensils,
      isActive: path.startsWith('/dashboard/kitchen'),
      items: [
        { title: "Orders Queue", url: "/dashboard/kitchen" },
        { title: "Recipes", url: "/dashboard/kitchen/recipes" },
        { title: "Menu Planning", url: "/dashboard/kitchen/menu-planning" },
      ],
    },
    {
      title: "Staff",
      url: "/dashboard/staff",
      icon: Users,
      isActive: path.startsWith('/dashboard/staff'),
      items: [
        { title: "Employees", url: "/dashboard/staff" },
        { title: "Schedules", url: "/dashboard/staff/schedules" },
        { title: "Roles", url: "/dashboard/staff/roles" },
        { title: "Performance", url: "/dashboard/staff/performance" },
      ],
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users2,
      isActive: path.startsWith('/dashboard/customers'),
      items: [
        { title: "All Customers", url: "/dashboard/customers" },
        { title: "Loyalty Program", url: "/dashboard/customers/loyalty" },
        { title: "Feedback", url: "/dashboard/customers/feedback" },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
      isActive: path.startsWith('/dashboard/analytics'),
      items: [
        { title: "Dashboard", url: "/dashboard/analytics" },
        { title: "Sales", url: "/dashboard/analytics/sales" },
        { title: "Reports", url: "/dashboard/analytics/reports" },
      ],
    },
    {
      title: "Finance",
      url: "/dashboard/finance",
      icon: DollarSign,
      isActive: path.startsWith('/dashboard/finance'),
      items: [
        { title: "Overview", url: "/dashboard/finance" },
        { title: "Expenses", url: "/dashboard/finance/expenses" },
        { title: "Revenue", url: "/dashboard/finance/revenue" },
        { title: "Payroll", url: "/dashboard/finance/payroll" },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: path.startsWith('/dashboard/settings'),
      items: [
        { title: "General", url: "/dashboard/settings" },
        { title: "Restaurant Profile", url: "/dashboard/settings/profile" },
        { title: "Integrations", url: "/dashboard/settings/integrations" },
        { title: "Users", url: "/dashboard/settings/users" },
      ],
    },
  ];

  // Return an object with both navMainItems and navProjectItems
  return {
    navMainItems,
    navProjectItems: [] // Empty array for now, add project items if needed
  };
};
