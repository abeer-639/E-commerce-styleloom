import { Order } from "./types";

export const orders: Order[] = [
  {
    id: "o1001",
    userId: "u2",
    items: [
      { productId: "p1", quantity: 1, priceAtPurchase: 129.0 },
      { productId: "p4", quantity: 2, priceAtPurchase: 39.99 },
    ],
    total: 129.0 + 2 * 39.99,
    status: "delivered",
    createdAt: "2026-05-12T10:00:00.000Z",
  },
  {
    id: "o1002",
    userId: "u2",
    items: [{ productId: "p9", quantity: 1, priceAtPurchase: 349.0 }],
    total: 349.0,
    status: "shipped",
    createdAt: "2026-06-30T14:20:00.000Z",
  },
  {
    id: "o1003",
    userId: "u3",
    items: [
      { productId: "p6", quantity: 1, priceAtPurchase: 59.0 },
      { productId: "p10", quantity: 1, priceAtPurchase: 29.0 },
    ],
    total: 59.0 + 29.0,
    status: "processing",
    createdAt: "2026-07-20T09:15:00.000Z",
  },
];

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter((o) => o.userId === userId);
}
