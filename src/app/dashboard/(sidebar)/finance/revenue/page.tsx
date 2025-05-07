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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar, Download, Search, TrendingUp } from "lucide-react";

// Mock revenue sources
const revenueSources = [
  "Dine-in",
  "Takeout",
  "Delivery",
  "Catering",
  "Events",
  "Merchandise",
  "Gift Cards"
];

// Mock revenue data
const generateRevenueData = () => {
  const revenues = [];
  const today = new Date();
  
  // Generate some revenue entries for the current month
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate different revenue entries for each day
    for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
      const source = revenueSources[Math.floor(Math.random() * revenueSources.length)];
      
      // Generate amount based on source
      let baseAmount = 0;
      switch (source) {
        case "Dine-in":
          baseAmount = 500 + Math.random() * 1000;
          break;
        case "Takeout":
          baseAmount = 300 + Math.random() * 500;
          break;
        case "Delivery":
          baseAmount = 400 + Math.random() * 600;
          break;
        case "Catering":
          baseAmount = 1000 + Math.random() * 2000;
          break;
        case "Events":
          baseAmount = 1500 + Math.random() * 3000;
          break;
        default:
          baseAmount = 100 + Math.random() * 300;
      }
      
      revenues.push({
        id: `REV-${1000 + revenues.length}`,
        date: date.toISOString().split('T')[0],
        source,
        description: `${source} revenue`,
        amount: Math.round(baseAmount),
        paymentMethod: Math.random() > 0.6 ? "Credit Card" : Math.random() > 0.5 ? "Cash" : "Online Payment",
        status: Math.random() > 0.1 ? "Received" : "Pending"
      });
    }
  }
  
  // Sort by date descending
  return revenues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export default function RevenuePage() {
  const [period, setPeriod] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [revenues, setRevenues] = useState(() => generateRevenueData());
  const [selectedSource, setSelectedSource] = useState("all");
  
  // Filter revenues based on search term, period, and source
  const filteredRevenues = revenues.filter(revenue => {
    const matchesSearch = 
      revenue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revenue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revenue.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = selectedSource === "all" || revenue.source === selectedSource;
    
    // Filter by period
    const revenueDate = new Date(revenue.date);
    const today = new Date();
    let matchesPeriod = true;
    
    if (period === "week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      matchesPeriod = revenueDate >= weekAgo;
    } else if (period === "month") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      matchesPeriod = revenueDate >= monthAgo;
    } else if (period === "quarter") {
      const quarterAgo = new Date(today);
      quarterAgo.setMonth(today.getMonth() - 3);
      matchesPeriod = revenueDate >= quarterAgo;
    } else if (period === "year") {
      const yearAgo = new Date(today);
      yearAgo.setFullYear(today.getFullYear() - 1);
      matchesPeriod = revenueDate >= yearAgo;
    }
    
    return matchesSearch && matchesSource && matchesPeriod;
  });
  
  // Calculate totals
  const totalRevenue = filteredRevenues.reduce((sum, revenue) => sum + revenue.amount, 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate source totals
  const sourceTotals = revenueSources.map(source => {
    const total = filteredRevenues
      .filter(revenue => revenue.source === source)
      .reduce((sum, revenue) => sum + revenue.amount, 0);
    
    return { source, total };
  }).sort((a, b) => b.total - a.total);
  
  // Calculate daily totals for chart
  const getDailyTotals = () => {
    const dailyMap = new Map();
    
    filteredRevenues.forEach(revenue => {
      const date = revenue.date;
      const currentTotal = dailyMap.get(date) || 0;
      dailyMap.set(date, currentTotal + revenue.amount);
    });
    
    // Convert to array and sort by date
    return Array.from(dailyMap.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const dailyTotals = getDailyTotals();
  
  // Simple bar chart component
  const BarChart = ({ data }: { data: { date: string, total: number }[] }) => {
    const values = data.map(item => item.total);
    const max = Math.max(...values, 1); // Avoid division by zero
    
    return (
      <div className="flex items-end h-40 gap-1">
        {data.map((item, index) => {
          const height = (item.total / max) * 100;
          const day = new Date(item.date).getDate();
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t bg-blue-500" 
                style={{ height: `${height}%`, minHeight: '1px' }}
              ></div>
              <div className="text-xs text-muted-foreground mt-1">
                {day}
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
        <h1 className="text-2xl font-bold">Revenue</h1>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For the selected period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Revenue Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sourceTotals[0]?.source || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(sourceTotals[0]?.total || 0)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                dailyTotals.length > 0 
                  ? totalRevenue / dailyTotals.length 
                  : 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {dailyTotals.length} days
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="sources">By Source</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
              <CardDescription>
                Revenue trends over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={dailyTotals} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Transactions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedSource} onValueChange={setSelectedSource}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {revenueSources.map(source => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRevenues.map((revenue) => (
                    <TableRow key={revenue.id}>
                      <TableCell className="font-medium">{revenue.id}</TableCell>
                      <TableCell>{formatDate(revenue.date)}</TableCell>
                      <TableCell>{revenue.source}</TableCell>
                      <TableCell>{revenue.description}</TableCell>
                      <TableCell>{formatCurrency(revenue.amount)}</TableCell>
                      <TableCell>{revenue.paymentMethod}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          revenue.status === "Received" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {revenue.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
              <CardDescription>
                Breakdown of revenue across different sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceTotals.map(({ source, total }) => (
                  <div key={source} className="flex items-center">
                    <div className="w-40 font-medium">{source}</div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (total / totalRevenue) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right">{formatCurrency(total)}</div>
                    <div className="w-16 text-right text-muted-foreground">
                      {totalRevenue > 0 
                        ? `${Math.round((total / totalRevenue) * 100)}%` 
                        : "0%"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}