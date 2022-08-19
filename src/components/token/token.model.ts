import { TokenType } from '../../@types/token.type'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema<TokenType>(
  {
    token_id: {
      type: String,
      default: uuidv4(),
    },
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
