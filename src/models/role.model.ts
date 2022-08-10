import { RoleType } from './../@types/role.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema<RoleType>(
  {
    role_number: {
      type: Number,
      required: true,
      unique: true,
    },

    role_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<RoleType>('Role', roleSchema, 'role')
