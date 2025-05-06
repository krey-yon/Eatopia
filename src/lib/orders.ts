// This file simulates a database for orders
// In a real app, this would be a database

export interface OrderItem {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  status: "placed" | "ready" | "out-for-delivery" | "delivered";
  address: string;
  timestamp: string;
  total: number;
}

// Get orders from localStorage
export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];

  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : [];
}

// Add a new order
export function addOrder(orderData: Omit<Order, "id">): string {
  const orders = getOrders();
  const id = Math.random().toString(36).substring(2, 9);

  const newOrder: Order = {
    id,
    ...orderData,
  };

  localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));
  return id;
}

// Get order by ID
export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((order) => order.id === id);
}

// Get delivered orders
export function getDeliveredOrders(): Order[] {
  const orders = getOrders();
  return orders.filter((order) => order.status === "delivered");
}

// Get active (undelivered) orders
export function getActiveOrders(): Order[] {
  const orders = getOrders();
  return orders.filter((order) => order.status !== "delivered");
}
