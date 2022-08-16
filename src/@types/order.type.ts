type OrderItem = {
  product_id: string
}

export type OrderType = {
  order_id?: string
  user_id: string
  status: string
  order_item: OrderItem[]
}
