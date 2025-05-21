"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  DollarSign, 
  Download, 
  ShoppingBag, 
  Users, 
  Utensils 
} from "lucide-react";

// This would typically come from a real analytics API
const generateMockData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate some realistic-looking data with weekly patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseOrders = isWeekend ? 80 : 50;
    const baseSales = isWeekend ? 3200 : 2000;
    const baseCustomers = isWeekend ? 120 : 75;
    
    // Add some randomness
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    
    data.push({
      date: date.toISOString().split('T')[0],
      orders: Math.round(baseOrders * randomFactor),
      sales: Math.round(baseSales * randomFactor),
      customers: Math.round(baseCustomers * randomFactor),
      avgOrderValue: Math.round((baseSales * randomFactor) / (baseOrders * randomFactor)),
    });
  }
  
  // Sort by date ascending
  return data.reverse();
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState(() => {
    // Initialize with 30 days of data
    return generateMockData(30);
  });
  
  // Filter data based on selected period
  const filteredData = (() => {
    switch (period) {
      case "7d":
        return data.slice(-7);
      case "14d":
        return data.slice(-14);
      case "30d":
        return data;
      case "90d":
        // In a real app, we'd fetch 90 days of data
        return data;
      default:
        return data.slice(-7);
    }
  })();
  
  // Calculate totals and comparisons
  const calculateMetrics = () => {
    const currentPeriod = filteredData;
    
    // For comparison, we use the same number of days before the current period
    const previousPeriodDays = currentPeriod.length;
    const previousPeriod = data.slice(-previousPeriodDays * 2, -previousPeriodDays);
    
    // If we don't have enough data for comparison, use what we have
    const validPreviousPeriod = previousPeriod.length > 0 ? previousPeriod : currentPeriod;
    
    const totalSales = currentPeriod.reduce((sum, day) => sum + day.sales, 0);
    const prevTotalSales = validPreviousPeriod.reduce((sum, day) => sum + day.sales, 0);
    const salesChange = prevTotalSales > 0 
      ? ((totalSales - prevTotalSales) / prevTotalSales) * 100 
      : 0;
    
    const totalOrders = currentPeriod.reduce((sum, day) => sum + day.orders, 0);
    const prevTotalOrders = validPreviousPeriod.reduce((sum, day) => sum + day.orders, 0);
    const ordersChange = prevTotalOrders > 0 
      ? ((totalOrders - prevTotalOrders) / prevTotalOrders) * 100 
      : 0;
    
    const totalCustomers = currentPeriod.reduce((sum, day) => sum + day.customers, 0);
    const prevTotalCustomers = validPreviousPeriod.reduce((sum, day) => sum + day.customers, 0);
    const customersChange = prevTotalCustomers > 0 
      ? ((totalCustomers - prevTotalCustomers) / prevTotalCustomers) * 100 
      : 0;
    
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const prevAvgOrderValue = prevTotalOrders > 0 ? prevTotalSales / prevTotalOrders : 0;
    const avgOrderValueChange = prevAvgOrderValue > 0 
      ? ((avgOrderValue - prevAvgOrderValue) / prevAvgOrderValue) * 100 
      : 0;
    
    return {
      totalSales,
      salesChange,
      totalOrders,
      ordersChange,
      totalCustomers,
      customersChange,
      avgOrderValue,
      avgOrderValueChange
    };
  };
  
  const metrics = calculateMetrics();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Helper for change indicators
  const ChangeIndicator = ({ value }: { value: number }) => {
    if (value > 0) {
      return (
        <div className="flex items-center text-green-600 text-sm font-medium">
          <ArrowUp className="h-4 w-4 mr-1" />
          {value.toFixed(1)}%
        </div>
      );
    } else if (value < 0) {
      return (
        <div className="flex items-center text-red-600 text-sm font-medium">
          <ArrowDown className="h-4 w-4 mr-1" />
          {Math.abs(value).toFixed(1)}%
        </div>
      );
    } else {
      return (
        <div className="text-gray-500 text-sm font-medium">0%</div>
      );
    }
  };
  
  // Simple bar chart component
  const BarChart = ({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) => {
    const values = data.map(item => item[dataKey]);
    const max = Math.max(...values);
    
    return (
      <div className="flex items-end h-40 gap-1">
        {data.map((item, index) => {
          const height = max > 0 ? (item[dataKey] / max) * 100 : 0;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-t ${color}`} 
                style={{ height: `${height}%`, minHeight: '1px' }}
              ></div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.date.split('-')[2]}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalSales)}</div>
              </div>
              <ChangeIndicator value={metrics.salesChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{metrics.totalOrders}</div>
              </div>
              <ChangeIndicator value={metrics.ordersChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
              </div>
              <ChangeIndicator value={metrics.customersChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.avgOrderValue)}</div>
              </div>
              <ChangeIndicator value={metrics.avgOrderValueChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Daily sales for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="sales" 
                color="bg-blue-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>
                Daily orders for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="orders" 
                color="bg-green-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Overview</CardTitle>
              <CardDescription>
                Daily customer count for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="customers" 
                color="bg-purple-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>
              Most popular menu items for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Signature Burger</span>
                </div>
                <span className="font-medium">142 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Truffle Fries</span>
                </div>
                <span className="font-medium">98 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Grilled Salmon</span>
                </div>
                <span className="font-medium">87 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Caesar Salad</span>
                </div>
                <span className="font-medium">76 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Chocolate Lava Cake</span>
                </div>
                <span className="font-medium">65 orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>
              Busiest hours during the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>7:00 PM - 8:00 PM</span>
                </div>
                <span className="font-medium">24% of orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>6:00 PM - 7:00 PM</span>
                </div>
                <span className="font-medium">18% of orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>8:00 PM - 9:00 PM</span>
                </div>
                <span className="font-medium">15% of orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>12:00 PM - 1:00 PM</span>
                </div>
                <span className="font-medium">12% of orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>1:00 PM - 2:00 PM</span>
                </div>
                <span className="font-medium">10% of orders</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
