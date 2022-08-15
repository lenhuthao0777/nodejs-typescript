import { Thumbnail } from './../@types/file.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema<Thumbnail>(
  {
    file_id: {
      type: String,
      required: true,
      unique: true,
    },

    file_url: {
      type: String,
      default: '',
    },

    file_url_dowload: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<Thumbnail>('File', roleSchema, 'file')
