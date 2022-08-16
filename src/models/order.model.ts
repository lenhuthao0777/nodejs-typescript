import mongoose from 'mongoose'
import { OrderType } from 'src/@types/order.type'

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema<OrderType>(
  {
    order_id: {
      type: String,
      // unique: false,
    },
    user_id: {
      type: String,
      required: true,
      unique: false,
    },

    status: {
      type: String,
      default: 'waiting to confirm',
      required: false,
      unique: false,
    },

    order_item: {
      type: [
        {
          product_id: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<OrderType>('Order', orderSchema, 'order')
