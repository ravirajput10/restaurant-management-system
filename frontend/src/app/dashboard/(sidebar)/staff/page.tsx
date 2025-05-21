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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, MoreHorizontal } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "on-leave" | "terminated";
  joinDate: string;
}

export default function StaffPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "EMP001",
      name: "John Smith",
      position: "Head Chef",
      department: "Kitchen",
      email: "john.smith@restaurant.com",
      phone: "(555) 123-4567",
      status: "active",
      joinDate: "2021-03-15",
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      position: "Sous Chef",
      department: "Kitchen",
      email: "sarah.johnson@restaurant.com",
      phone: "(555) 234-5678",
      status: "active",
      joinDate: "2021-06-22",
    },
    {
      id: "EMP003",
      name: "Michael Brown",
      position: "Server",
      department: "Front of House",
      email: "michael.brown@restaurant.com",
      phone: "(555) 345-6789",
      status: "active",
      joinDate: "2022-01-10",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      position: "Bartender",
      department: "Bar",
      email: "emily.davis@restaurant.com",
      phone: "(555) 456-7890",
      status: "on-leave",
      joinDate: "2021-09-05",
    },
    {
      id: "EMP005",
      name: "Robert Wilson",
      position: "Host",
      department: "Front of House",
      email: "robert.wilson@restaurant.com",
      phone: "(555) 567-8901",
      status: "terminated",
      joinDate: "2022-02-15",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "on-leave":
        return "warning";
      case "terminated":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(employee.status)}>
                        {employee.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}