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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  DollarSign, 
  Download, 
  TrendingDown, 
  TrendingUp, 
  Wallet 
} from "lucide-react";

// Mock data generation
const generateFinanceData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate some realistic-looking data with weekly patterns
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseRevenue = isWeekend ? 3500 : 2200;
    const baseCosts = isWeekend ? 2000 : 1500;
    
    // Add some randomness
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const randomCostFactor = 0.85 + Math.random() * 0.3; // 0.85 to 1.15
    
    const revenue = Math.round(baseRevenue * randomFactor);
    const costs = Math.round(baseCosts * randomCostFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: revenue,
      costs: costs,
      profit: revenue - costs,
    });
  }
  
  // Sort by date ascending
  return data.reverse();
};

export default function FinancePage() {
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState(() => generateFinanceData(30));
  
  // Filter data based on selected period
  const filteredData = (() => {
    switch (period) {
      case "7d": return data.slice(-7);
      case "14d": return data.slice(-14);
      case "30d": return data;
      default: return data.slice(-7);
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
    
    const totalRevenue = currentPeriod.reduce((sum, day) => sum + day.revenue, 0);
    const prevTotalRevenue = validPreviousPeriod.reduce((sum, day) => sum + day.revenue, 0);
    const revenueChange = prevTotalRevenue > 0 
      ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 
      : 0;
    
    const totalCosts = currentPeriod.reduce((sum, day) => sum + day.costs, 0);
    const prevTotalCosts = validPreviousPeriod.reduce((sum, day) => sum + day.costs, 0);
    const costsChange = prevTotalCosts > 0 
      ? ((totalCosts - prevTotalCosts) / prevTotalCosts) * 100 
      : 0;
    
    const totalProfit = currentPeriod.reduce((sum, day) => sum + day.profit, 0);
    const prevTotalProfit = validPreviousPeriod.reduce((sum, day) => sum + day.profit, 0);
    const profitChange = prevTotalProfit > 0 
      ? ((totalProfit - prevTotalProfit) / prevTotalProfit) * 100 
      : 0;
    
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    const prevProfitMargin = prevTotalRevenue > 0 ? (prevTotalProfit / prevTotalRevenue) * 100 : 0;
    const profitMarginChange = prevProfitMargin > 0 
      ? profitMargin - prevProfitMargin
      : 0;
    
    return {
      totalRevenue,
      revenueChange,
      totalCosts,
      costsChange,
      totalProfit,
      profitChange,
      profitMargin,
      profitMarginChange
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
  
  // Change indicator component
  const ChangeIndicator = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? ArrowUp : ArrowDown;
    const colorClass = isPositive ? "text-green-500" : "text-red-500";
    
    return (
      <div className={`flex items-center ${colorClass}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
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
        <h1 className="text-2xl font-bold">Finance</h1>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
              </div>
              <ChangeIndicator value={metrics.revenueChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalCosts)}</div>
              </div>
              <ChangeIndicator value={-metrics.costsChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{formatCurrency(metrics.totalProfit)}</div>
              </div>
              <ChangeIndicator value={metrics.profitChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingDown className="h-5 w-5 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">{metrics.profitMargin.toFixed(1)}%</div>
              </div>
              <ChangeIndicator value={metrics.profitMarginChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="profit">Profit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Daily revenue for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="revenue" 
                color="bg-blue-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="costs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Costs Overview</CardTitle>
              <CardDescription>
                Daily costs for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="costs" 
                color="bg-red-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Overview</CardTitle>
              <CardDescription>
                Daily profit for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={filteredData} 
                dataKey="profit" 
                color="bg-green-500" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}