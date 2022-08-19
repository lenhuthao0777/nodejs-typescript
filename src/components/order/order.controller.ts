import { Request, Response } from 'express'
import { OrderType } from 'src/@types/order.type'
import orderModel from './order.model'

export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const body: OrderType = req.body
    const newOrder = await new orderModel<OrderType>({
      user_id: body.user_id,
      status: body.status,
      order_item: body.order_item,
    })
    await newOrder.save()
    res.status(200).json({ message: 'Order sucess!', body })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!', error })
  }
}
