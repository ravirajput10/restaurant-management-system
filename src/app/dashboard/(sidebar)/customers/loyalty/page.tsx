"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Download, Gift, Award, Star, Plus, Settings } from "lucide-react";

interface LoyaltyCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  joinDate: string;
  lastActivity: string;
  pointsHistory: {
    id: string;
    date: string;
    description: string;
    points: number;
    type: "earned" | "redeemed";
  }[];
}

export default function LoyaltyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([
    {
      id: "CUST001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      points: 1250,
      tier: "gold",
      joinDate: "2022-03-15",
      lastActivity: "2023-06-15",
      pointsHistory: [
        {
          id: "PTS001",
          date: "2023-06-15",
          description: "Order #12345",
          points: 150,
          type: "earned",
        },
        {
          id: "PTS002",
          date: "2023-05-22",
          description: "Free Dessert Redemption",
          points: -100,
          type: "redeemed",
        },
      ],
    },
    {
      id: "CUST002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 234-5678",
      points: 750,
      tier: "silver",
      joinDate: "2022-05-10",
      lastActivity: "2023-05-22",
      pointsHistory: [
        {
          id: "PTS003",
          date: "2023-05-22",
          description: "Order #12289",
          points: 120,
          type: "earned",
        },
      ],
    },
    {
      id: "CUST003",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "(555) 345-6789",
      points: 100,
      tier: "bronze",
      joinDate: "2023-01-05",
      lastActivity: "2023-06-01",
      pointsHistory: [
        {
          id: "PTS004",
          date: "2023-06-01",
          description: "Order #12300",
          points: 100,
          type: "earned",
        },
      ],
    },
    {
      id: "CUST004",
      name: "Emily Williams",
      email: "emily.williams@example.com",
      phone: "(555) 456-7890",
      points: 2500,
      tier: "platinum",
      joinDate: "2021-11-20",
      lastActivity: "2023-06-10",
      pointsHistory: [
        {
          id: "PTS005",
          date: "2023-06-10",
          description: "Order #12340",
          points: 200,
          type: "earned",
        },
        {
          id: "PTS006",
          date: "2023-05-15",
          description: "Birthday Bonus",
          points: 500,
          type: "earned",
        },
        {
          id: "PTS007",
          date: "2023-04-30",
          description: "Free Meal Redemption",
          points: -1000,
          type: "redeemed",
        },
      ],
    },
  ]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "secondary";
      case "silver":
        return "outline";
      case "gold":
        return "warning";
      case "platinum":
        return "default";
      default:
        return "secondary";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze":
        return <Award className="h-5 w-5 text-orange-700" />;
      case "silver":
        return <Award className="h-5 w-5 text-gray-400" />;
      case "gold":
        return <Award className="h-5 w-5 text-yellow-500" />;
      case "platinum":
        return <Award className="h-5 w-5 text-blue-500" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loyalty Program</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Program Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Reward
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => 
                new Date(c.lastActivity) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((total, customer) => 
                total + customer.pointsHistory
                  .filter(h => h.type === "earned")
                  .reduce((sum, h) => sum + h.points, 0), 
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Members</CardTitle>
              <CardDescription>
                Manage your loyalty program members and their points.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.points}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTierIcon(customer.tier)}
                            <Badge variant={getTierBadgeVariant(customer.tier) as any}>
                              {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(customer.joinDate)}</TableCell>
                        <TableCell>{formatDate(customer.lastActivity)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Adjust Points
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Free Dessert</CardTitle>
                <CardDescription>100 points</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redeem points for a free dessert of your choice with any meal purchase.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Gift className="mr-2 h-4 w-4" /> Edit Reward
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Free Appetizer</CardTitle>
                <CardDescription>150 points</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redeem points for a free appetizer with any meal purchase.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Gift className="mr-2 h-4 w-4" /> Edit Reward
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Free Entrée</CardTitle>
                <CardDescription>500 points</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redeem points for a free entrée up to $25 in value.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Gift className="mr-2 h-4 w-4" /> Edit Reward
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>$25 Gift Card</CardTitle>
                <CardDescription>750 points</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redeem points for a $25 gift card to use on future visits.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Gift className="mr-2 h-4 w-4" /> Edit Reward
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Private Dining Experience</CardTitle>
                <CardDescription>2000 points</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redeem points for a private dining experience for up to 4 people.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Gift className="mr-2 h-4 w-4" /> Edit Reward
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tiers" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Bronze</CardTitle>
                  <Award className="h-5 w-5 text-orange-700" />
                </div>
                <CardDescription>0-500 points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Earn 1 point per $1 spent</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Birthday reward</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Silver</CardTitle>
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <CardDescription>501-1000 points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Earn 1.25 points per $1 spent</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Birthday reward</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Priority seating</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Gold</CardTitle>
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>1001-2000 points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Earn 1.5 points per $1 spent</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Birthday reward</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Priority seating</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Quarterly bonus points</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Platinum</CardTitle>
                  <Award className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>2001+ points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Earn 2 points per $1 spent</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Birthday reward</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Priority seating</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Quarterly bonus points</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Exclusive events</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
