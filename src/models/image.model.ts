import { FileType } from './../@types/file.type'
import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const roleSchema = new mongoose.Schema<FileType>(
  {
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    originalname: {
      type: String,
      required: true,
      unique: true,
    },
    encoding: {
      type: String,
      required: true,
      unique: true,
    },
    mimetype: {
      type: String,
      required: true,
      unique: true,
    },
    destination: {
      type: String,
      required: true,
      unique: true,
    },
    fieldname: {
      type: String,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model<FileType>('Image', roleSchema, 'image')
