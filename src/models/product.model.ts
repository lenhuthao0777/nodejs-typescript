import { ProductType } from './../@types/product.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    thumbnail: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    size_clothes_id: {
      type: String,
      default: '',
    },

    size_shoes_id: {
      type: String,
      default: '',
    },

    code: {
      type: String,
      default: '',
    },

    category_id: {
      type: String,
      required: true,
    },

    merchant_id: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    discount: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<ProductType>('Product', productSchema, 'product')