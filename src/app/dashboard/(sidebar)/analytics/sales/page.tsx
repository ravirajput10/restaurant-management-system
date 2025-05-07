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
import { Calendar, Download } from "lucide-react";

// Reuse the mock data generation from the main analytics page
const generateMockData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseSales = isWeekend ? 3200 : 2000;
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.round(baseSales * randomFactor),
    });
  }
  
  return data.reverse();
};

export default function SalesAnalyticsPage() {
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState(() => generateMockData(30));
  
  // Filter data based on selected period
  const filteredData = (() => {
    switch (period) {
      case "7d": return data.slice(-7);
      case "14d": return data.slice(-14);
      case "30d": return data;
      default: return data.slice(-7);
    }
  })();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Simple bar chart component
  const BarChart = ({ data }: { data: any[] }) => {
    const values = data.map(item => item.sales);
    const max = Math.max(...values);
    
    return (
      <div className="flex items-end h-40 gap-1">
        {data.map((item, index) => {
          const height = max > 0 ? (item.sales / max) * 100 : 0;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t bg-blue-500" 
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
        <h1 className="text-2xl font-bold">Sales Analytics</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Daily sales for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}