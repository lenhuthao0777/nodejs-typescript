import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_URL } = process.env

export const connectDb = () => {
  try {
    mongoose
      .connect(
        String(DATABASE_URL)
        // {
        //   useNewUrlParser: true,
        //   useFindAndModify: false,
        //   useUnifiedTopology: true,
        // }
      )
      .then(() => console.log('Connect db success!'))
      .catch((error) => console.log('log:', error))
  } catch (error) {
    console.log(error)
  }
}
