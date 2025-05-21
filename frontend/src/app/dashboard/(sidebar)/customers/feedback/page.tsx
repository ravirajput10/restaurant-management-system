"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Search, Download, Star, Filter, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface CustomerFeedback {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  rating: number;
  comment: string;
  source: "in-store" | "online" | "email" | "phone";
  status: "new" | "reviewed" | "responded";
  category?: string;
  orderId?: string;
}

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<CustomerFeedback[]>([
    {
      id: "FB001",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      date: "2023-06-15",
      rating: 5,
      comment: "The food was amazing and the service was excellent. Our server was very attentive and made great recommendations. Will definitely be coming back!",
      source: "in-store",
      status: "reviewed",
      category: "service",
      orderId: "ORD-12345"
    },
    {
      id: "FB002",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      date: "2023-06-10",
      rating: 3,
      comment: "Food was good but it took too long to arrive. The restaurant was not even that busy.",
      source: "online",
      status: "responded",
      category: "speed",
      orderId: "ORD-12289"
    },
    {
      id: "FB003",
      customerName: "Michael Johnson",
      customerEmail: "michael.johnson@example.com",
      date: "2023-06-05",
      rating: 2,
      comment: "My order was incorrect and when I mentioned it to the staff, they were not very helpful.",
      source: "email",
      status: "new",
      category: "accuracy",
      orderId: "ORD-12100"
    },
    {
      id: "FB004",
      customerName: "Emily Williams",
      customerEmail: "emily.williams@example.com",
      date: "2023-06-01",
      rating: 5,
      comment: "The new menu items are fantastic! Loved the seasonal specials.",
      source: "in-store",
      status: "reviewed",
      category: "food",
    },
    {
      id: "FB005",
      customerName: "David Brown",
      customerEmail: "david.brown@example.com",
      date: "2023-05-28",
      rating: 4,
      comment: "Great atmosphere and friendly staff. The music was a bit loud though.",
      source: "online",
      status: "new",
      category: "ambiance",
      orderId: "ORD-12050"
    },
  ]);

  const filteredFeedback = feedback.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "success";
    if (rating === 3) return "warning";
    return "destructive";
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "default";
      case "reviewed":
        return "secondary";
      case "responded":
        return "success";
      default:
        return "secondary";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "in-store":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "online":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "email":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "phone":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const averageRating = 
    feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;
  
  const positiveCount = feedback.filter(item => item.rating >= 4).length;
  const neutralCount = feedback.filter(item => item.rating === 3).length;
  const negativeCount = feedback.filter(item => item.rating <= 2).length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Feedback</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{positiveCount}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((positiveCount / feedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Neutral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="h-5 w-5 text-yellow-500 mr-2">—</div>
              <div className="text-2xl font-bold">{neutralCount}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((neutralCount / feedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Negative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{negativeCount}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((negativeCount / feedback.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Needs Attention</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Customer Feedback</CardTitle>
              <CardDescription>
                View and manage feedback from all channels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search feedback..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.customerName}</div>
                            <div className="text-sm text-muted-foreground">{item.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell>
                          <Badge variant={getRatingColor(item.rating)}>
                            {item.rating}/5
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={item.comment}>
                            {item.comment.length > 60
                              ? `${item.comment.substring(0, 60)}...`
                              : item.comment}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSourceIcon(item.source)}
                            <span className="capitalize">{item.source}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Respond
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
        
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>New Feedback</CardTitle>
              <CardDescription>
                Recently received feedback that needs review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback
                      .filter((item) => item.status === "new")
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.customerName}</div>
                              <div className="text-sm text-muted-foreground">{item.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>
                            <Badge variant={getRatingColor(item.rating)}>
                              {item.rating}/5
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={item.comment}>
                              {item.comment.length > 60
                                ? `${item.comment.substring(0, 60)}...`
                                : item.comment}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSourceIcon(item.source)}
                              <span className="capitalize">{item.source}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Respond
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
        
        <TabsContent value="positive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Positive Feedback</CardTitle>
              <CardDescription>
                Feedback with ratings of 4 or 5 stars.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback
                      .filter((item) => item.rating >= 4)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.customerName}</div>
                              <div className="text-sm text-muted-foreground">{item.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>
                            <Badge variant={getRatingColor(item.rating)}>
                              {item.rating}/5
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={item.comment}>
                              {item.comment.length > 60
                                ? `${item.comment.substring(0, 60)}...`
                                : item.comment}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSourceIcon(item.source)}
                              <span className="capitalize">{item.source}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Respond
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
        
        <TabsContent value="negative" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Needs Attention</CardTitle>
              <CardDescription>
                Feedback with ratings of 1 or 2 stars that may need immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback
                      .filter((item) => item.rating <= 2)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.customerName}</div>
                              <div className="text-sm text-muted-foreground">{item.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>
                            <Badge variant={getRatingColor(item.rating)}>
                              {item.rating}/5
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={item.comment}>
                              {item.comment.length > 60
                                ? `${item.comment.substring(0, 60)}...`
                                : item.comment}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSourceIcon(item.source)}
                              <span className="capitalize">{item.source}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Respond
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
      </Tabs>
    </div>
  );
}