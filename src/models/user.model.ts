import { UserType } from './../@types/user.type'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema<UserType>(
  {
    user_id: {
      type: String,
      default: uuidv4(),
    },

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

    country: {
      type: String,
      required: true,
      minlength: 4,
    },

    phone_number: {
      type: String,
      unique: true,
    },

    feed_back_id: {
      type: [],
      default: [],
    },

    product_id: {
      type: [],
      default: [],
    },

    role_id: {
      type: String,
      default: '62f3223a0213723595f3af8f',
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<UserType>('User', userSchema, 'user')
