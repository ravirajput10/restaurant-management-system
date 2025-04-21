import { Order } from "@/types";

export async function getOrders(): Promise<Order[]> {
  // In a real application, this would fetch from your API
  return [
    {
      id: "1",
      orderId: "ORD-001",
      customerName: "John Doe",
      status: "PENDING",
      items: [
        {
          id: "1",
          name: "Burger",
          quantity: 2,
          price: 9.99,
          subtotal: 19.98
        }
      ],
      total: 19.98,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

export async function getOrderHistory(): Promise<Order[]> {
  // In a real application, this would fetch completed orders from your API
  return [
    {
      id: "2",
      orderId: "ORD-002",
      customerName: "Jane Smith",
      status: "DELIVERED",
      items: [
        {
          id: "2",
          name: "Pizza",
          quantity: 1,
          price: 14.99,
          subtotal: 14.99
        }
      ],
      total: 14.99,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      updatedAt: new Date(Date.now() - 82800000).toISOString()
    },
    {
      id: "3",
      orderId: "ORD-003",
      customerName: "Mike Johnson",
      status: "DELIVERED",
      items: [
        {
          id: "3",
          name: "Pasta",
          quantity: 2,
          price: 12.99,
          subtotal: 25.98
        }
      ],
      total: 25.98,
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 169200000).toISOString()
    }
  ];
}

