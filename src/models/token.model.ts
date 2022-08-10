import { TokenType } from './../@types/token.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema<TokenType>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<TokenType>('Token', roleSchema, 'token')
