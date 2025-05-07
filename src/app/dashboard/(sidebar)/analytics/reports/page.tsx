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
import { Calendar, Download, FileText } from "lucide-react";

export default function ReportsPage() {
  const [period, setPeriod] = useState("month");
  
  // Mock report data
  const reports = [
    {
      id: "rep001",
      name: "Monthly Sales Summary",
      description: "Overview of sales performance for the current month",
      date: "2023-11-01",
      type: "sales"
    },
    {
      id: "rep002",
      name: "Customer Engagement Report",
      description: "Analysis of customer activity and retention",
      date: "2023-11-01",
      type: "customers"
    },
    {
      id: "rep003",
      name: "Inventory Usage Report",
      description: "Tracking of inventory consumption and waste",
      date: "2023-11-01",
      type: "inventory"
    },
    {
      id: "rep004",
      name: "Staff Performance Summary",
      description: "Overview of staff productivity and ratings",
      date: "2023-11-01",
      type: "staff"
    },
    {
      id: "rep005",
      name: "Popular Items Report",
      description: "Analysis of most ordered menu items",
      date: "2023-11-01",
      type: "menu"
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics Reports</h1>
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
            <Download className="h-4 w-4 mr-2" /> Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Generated: {report.date}
                    </div>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" /> View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter(report => report.type === "sales")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Generated: {report.date}
                      </div>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter(report => report.type === "customers")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Generated: {report.date}
                      </div>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reports
              .filter(report => report.type === "inventory")
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Generated: {report.date}
                      </div>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}