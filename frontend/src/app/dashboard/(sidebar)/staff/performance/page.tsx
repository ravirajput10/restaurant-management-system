"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

interface PerformanceMetric {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  metrics: {
    ordersProcessed?: number;
    averageOrderTime?: number;
    customerRating?: number;
    salesAmount?: number;
    attendance?: number;
  };
  rating: 1 | 2 | 3 | 4 | 5;
  period: string;
}

export default function PerformancePage() {
  const [period, setPeriod] = useState("month");
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([
    {
      id: "PERF001",
      employeeId: "EMP001",
      employeeName: "John Smith",
      position: "Head Chef",
      department: "Kitchen",
      metrics: {
        ordersProcessed: 450,
        averageOrderTime: 12.5,
        customerRating: 4.8,
        attendance: 98,
      },
      rating: 5,
      period: "month",
    },
    {
      id: "PERF002",
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      position: "Sous Chef",
      department: "Kitchen",
      metrics: {
        ordersProcessed: 380,
        averageOrderTime: 14.2,
        customerRating: 4.6,
        attendance: 95,
      },
      rating: 4,
      period: "month",
    },
    {
      id: "PERF003",
      employeeId: "EMP003",
      employeeName: "Michael Brown",
      position: "Server",
      department: "Front of House",
      metrics: {
        ordersProcessed: 210,
        averageOrderTime: 5.8,
        customerRating: 4.7,
        salesAmount: 12500,
        attendance: 92,
      },
      rating: 4,
      period: "month",
    },
    {
      id: "PERF004",
      employeeId: "EMP004",
      employeeName: "Emily Davis",
      position: "Bartender",
      department: "Bar",
      metrics: {
        ordersProcessed: 320,
        averageOrderTime: 4.2,
        customerRating: 4.5,
        salesAmount: 9800,
        attendance: 90,
      },
      rating: 3,
      period: "month",
    },
  ]);

  const filteredData = performanceData.filter(
    (item) => item.period === period
  );

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 5:
        return "success";
      case 4:
        return "success";
      case 3:
        return "warning";
      case 2:
        return "destructive";
      case 1:
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Performance</h1>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
          <TabsTrigger value="front">Front of House</TabsTrigger>
          <TabsTrigger value="bar">Bar</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.employeeName}</CardTitle>
                    <Badge variant={getRatingColor(item.rating)}>
                      {item.rating}/5
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.position} • {item.department}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {item.metrics.ordersProcessed && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Orders Processed</span>
                        <span className="font-medium">{item.metrics.ordersProcessed}</span>
                      </div>
                    )}
                    {item.metrics.averageOrderTime && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Order Time</span>
                        <span className="font-medium">{item.metrics.averageOrderTime} min</span>
                      </div>
                    )}
                    {item.metrics.customerRating && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Customer Rating</span>
                        <span className="font-medium">{item.metrics.customerRating}/5</span>
                      </div>
                    )}
                    {item.metrics.salesAmount && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Sales Amount</span>
                        <span className="font-medium">${item.metrics.salesAmount}</span>
                      </div>
                    )}
                    {item.metrics.attendance && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className="font-medium">{item.metrics.attendance}%</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="kitchen" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData
              .filter((item) => item.department === "Kitchen")
              .map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.employeeName}</CardTitle>
                      <Badge variant={getRatingColor(item.rating)}>
                        {item.rating}/5
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.position} • {item.department}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Same content as above */}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="front" className="mt-4">
          {/* Front of House staff */}
        </TabsContent>
        <TabsContent value="bar" className="mt-4">
          {/* Bar staff */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
