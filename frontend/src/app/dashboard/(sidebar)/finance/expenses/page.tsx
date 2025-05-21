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
import { Calendar, Download, Plus, Search } from "lucide-react";

// Mock expense categories
const expenseCategories = [
  "Ingredients",
  "Utilities",
  "Rent",
  "Equipment",
  "Salaries",
  "Marketing",
  "Maintenance",
  "Insurance",
  "Licenses",
  "Other"
];

// Mock expense data
const generateExpenseData = () => {
  const expenses = [];
  const today = new Date();
  
  // Generate some expenses for the current month
  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
    
    // Generate amount based on category
    let baseAmount = 0;
    switch (category) {
      case "Ingredients":
        baseAmount = 100 + Math.random() * 500;
        break;
      case "Utilities":
        baseAmount = 200 + Math.random() * 300;
        break;
      case "Rent":
        baseAmount = 1500 + Math.random() * 500;
        break;
      case "Salaries":
        baseAmount = 1000 + Math.random() * 2000;
        break;
      default:
        baseAmount = 50 + Math.random() * 200;
    }
    
    expenses.push({
      id: `EXP-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      category,
      description: `${category} expense`,
      amount: Math.round(baseAmount),
      paymentMethod: Math.random() > 0.5 ? "Credit Card" : "Bank Transfer",
      status: Math.random() > 0.2 ? "Paid" : "Pending"
    });
  }
  
  // Sort by date descending
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export default function ExpensesPage() {
  const [period, setPeriod] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");
  const [expenses, setExpenses] = useState(() => generateExpenseData());
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter expenses based on search term, period, and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
    
    // Filter by period
    const expenseDate = new Date(expense.date);
    const today = new Date();
    let matchesPeriod = true;
    
    if (period === "week") {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      matchesPeriod = expenseDate >= weekAgo;
    } else if (period === "month") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      matchesPeriod = expenseDate >= monthAgo;
    } else if (period === "quarter") {
      const quarterAgo = new Date(today);
      quarterAgo.setMonth(today.getMonth() - 3);
      matchesPeriod = expenseDate >= quarterAgo;
    } else if (period === "year") {
      const yearAgo = new Date(today);
      yearAgo.setFullYear(today.getFullYear() - 1);
      matchesPeriod = expenseDate >= yearAgo;
    }
    
    return matchesSearch && matchesCategory && matchesPeriod;
  });
  
  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
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
  
  // Calculate category totals
  const categoryTotals = expenseCategories.map(category => {
    const total = filteredExpenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return { category, total };
  }).sort((a, b) => b.total - a.total);
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
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
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Expense
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For the selected period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Largest Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryTotals[0]?.category || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(categoryTotals[0]?.total || 0)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredExpenses
                  .filter(expense => expense.status === "Pending")
                  .reduce((sum, expense) => sum + expense.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredExpenses.filter(expense => expense.status === "Pending").length} pending items
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Expense List</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Expense Transactions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search expenses..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {expenseCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>{expense.paymentMethod}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          expense.status === "Paid" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {expense.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>
                Breakdown of expenses across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryTotals.map(({ category, total }) => (
                  <div key={category} className="flex items-center">
                    <div className="w-40 font-medium">{category}</div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (total / totalExpenses) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right">{formatCurrency(total)}</div>
                    <div className="w-16 text-right text-muted-foreground">
                      {totalExpenses > 0 
                        ? `${Math.round((total / totalExpenses) * 100)}%` 
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