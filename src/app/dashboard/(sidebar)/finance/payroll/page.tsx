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
import { Calendar, Download, Plus, Search, Users } from "lucide-react";

// Mock departments
const departments = [
  "Kitchen",
  "Service",
  "Management",
  "Delivery",
  "Cleaning",
  "Administration"
];

// Mock employee roles
const roles = {
  "Kitchen": ["Chef", "Sous Chef", "Line Cook", "Prep Cook", "Dishwasher"],
  "Service": ["Server", "Host/Hostess", "Bartender", "Busser"],
  "Management": ["General Manager", "Assistant Manager", "Shift Manager"],
  "Delivery": ["Delivery Driver", "Dispatcher"],
  "Cleaning": ["Janitor", "Cleaning Staff"],
  "Administration": ["Accountant", "HR Specialist", "Marketing Coordinator"]
};

// Mock employee data
const generateEmployeeData = () => {
  const employees = [];
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Nancy"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"];
  
  // Generate 20 employees
  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const role = roles[department][Math.floor(Math.random() * roles[department].length)];
    
    // Generate salary based on role
    let baseSalary = 0;
    if (role.includes("Manager")) {
      baseSalary = 50000 + Math.random() * 20000;
    } else if (role.includes("Chef")) {
      baseSalary = 45000 + Math.random() * 15000;
    } else if (role === "Accountant" || role === "HR Specialist" || role === "Marketing Coordinator") {
      baseSalary = 42000 + Math.random() * 13000;
    } else {
      baseSalary = 30000 + Math.random() * 10000;
    }
    
    // Generate hourly rate for some positions
    const isHourly = ["Server", "Host/Hostess", "Bartender", "Busser", "Dishwasher", "Line Cook", "Prep Cook", "Delivery Driver", "Janitor", "Cleaning Staff"].includes(role);
    const hourlyRate = isHourly ? (12 + Math.random() * 8) : null;
    
    // Generate hours for hourly employees
    const hoursPerWeek = isHourly ? 20 + Math.random() * 20 : null;
    
    // Calculate annual compensation
    const annualCompensation = isHourly 
      ? Math.round(hourlyRate * hoursPerWeek * 52) 
      : Math.round(baseSalary);
    
    employees.push({
      id: `EMP-${1000 + i}`,
      firstName,
      lastName,
      department,
      role,
      isHourly,
      hourlyRate: isHourly ? Math.round(hourlyRate * 100) / 100 : null,
      hoursPerWeek: isHourly ? Math.round(hoursPerWeek) : null,
      salary: isHourly ? null : Math.round(baseSalary),
      annualCompensation,
      startDate: new Date(
        2020 + Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0],
      status: Math.random() > 0.1 ? "Active" : "On Leave"
    });
  }
  
  // Sort by department and last name
  return employees.sort((a, b) => {
    if (a.department === b.department) {
      return a.lastName.localeCompare(b.lastName);
    }
    return a.department.localeCompare(b.department);
  });
};

export default function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(() => generateEmployeeData());
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  
  // Filter employees based on search term and department
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  // Calculate payroll totals
  const totalAnnualPayroll = filteredEmployees.reduce((sum, employee) => sum + employee.annualCompensation, 0);
  const totalHourlyEmployees = filteredEmployees.filter(employee => employee.isHourly).length;
  const totalSalariedEmployees = filteredEmployees.filter(employee => !employee.isHourly).length;
  
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
  
  // Calculate department payroll totals
  const departmentTotals = departments.map(department => {
    const departmentEmployees = filteredEmployees.filter(employee => employee.department === department);
    const total = departmentEmployees.reduce((sum, employee) => sum + employee.annualCompensation, 0);
    const count = departmentEmployees.length;
    
    return { department, total, count };
  }).sort((a, b) => b.total - a.total);
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Employee
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Annual Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAnnualPayroll)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For {filteredEmployees.length} employees
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Employee Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalHourlyEmployees} / {totalSalariedEmployees}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Hourly / Salaried employees
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Compensation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredEmployees.length > 0 
                  ? totalAnnualPayroll / filteredEmployees.length 
                  : 0
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per employee annually
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="employees" className="w-full">
        <TabsList>
          <TabsTrigger value="employees">Employee List</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Payroll</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search employees..."
                      className="pl-8 w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>
                          {department}
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
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Annual</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.isHourly ? "Hourly" : "Salary"}</TableCell>
                      <TableCell>
                        {employee.isHourly 
                          ? `$${employee.hourlyRate}/hr` 
                          : formatCurrency(employee.salary)}
                      </TableCell>
                      <TableCell>{formatCurrency(employee.annualCompensation)}</TableCell>
                      <TableCell>{formatDate(employee.startDate)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          employee.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {employee.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll by Department</CardTitle>
              <CardDescription>
                Breakdown of payroll costs across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentTotals.map(({ department, total, count }) => (
                  <div key={department} className="flex items-center">
                    <div className="w-40 font-medium">{department}</div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${Math.min(100, (total / totalAnnualPayroll) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right">{formatCurrency(total)}</div>
                    <div className="w-16 text-right text-muted-foreground">
                      {count} {count === 1 ? "emp" : "emps"}
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