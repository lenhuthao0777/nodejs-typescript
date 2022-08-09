import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
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
      type: Number,
      default: null,
    },

    phone_number: {
      type: Number,
      unique: true,
      default: null,
    },

    role: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model('User', userSchema, 'user')
