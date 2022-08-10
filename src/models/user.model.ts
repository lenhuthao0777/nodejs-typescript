import { UserType } from './../@types/user.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema<UserType>(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 25,
    },

    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 25,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    country_code: {
      type: String,
      default: null,
    },

    phone_number: {
      type: Number,
      unique: true,
      default: null,
    },

    feed_back_id: {
      type: String,
      unique: true,
      default: '',
    },

    product_id: {
      type: String,
      unique: true,
      default: '',
    },

    role_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<UserType>('User', userSchema, 'user')
