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
import { Search, Plus, MoreHorizontal } from "lucide-react";

interface Role {
  id: string;
  name: string;
  department: string;
  permissions: string[];
  employeeCount: number;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "ROLE001",
      name: "Head Chef",
      department: "Kitchen",
      permissions: ["menu_edit", "inventory_manage", "staff_view", "kitchen_all"],
      employeeCount: 1,
    },
    {
      id: "ROLE002",
      name: "Sous Chef",
      department: "Kitchen",
      permissions: ["menu_view", "inventory_view", "kitchen_manage"],
      employeeCount: 2,
    },
    {
      id: "ROLE003",
      name: "Server",
      department: "Front of House",
      permissions: ["orders_create", "orders_view", "customers_view"],
      employeeCount: 8,
    },
    {
      id: "ROLE004",
      name: "Bartender",
      department: "Bar",
      permissions: ["orders_create", "orders_view", "inventory_view"],
      employeeCount: 3,
    },
    {
      id: "ROLE005",
      name: "Manager",
      department: "Management",
      permissions: ["admin_all", "reports_all", "staff_manage", "finance_view"],
      employeeCount: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Roles</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search roles..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => (
          <Card key={role.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline">{role.department}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Permissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Employees</span>
                  <span className="font-medium">{role.employeeCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}