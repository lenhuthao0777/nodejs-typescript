import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// const { DATABASE_URL } = process.env

export const connectDb = () => {
  // const mongoUrl = ``
  try {
    mongoose
      .connect(
        'mongodb+srv://shop-shoes:bs2zVGdRneIe9wHE@cluster0.i4rykqo.mongodb.net/?retryWrites=true&w=majority'
        // {
        //   useNewUrlParser: true,
        //   useFindAndModify: false,
        //   useUnifiedTopology: true,
        // }
      )
      .then(() => console.log('connect db success!'))
      .catch((error) => console.log('log:', error))
  } catch (error) {
    console.log(error)
  }
}
