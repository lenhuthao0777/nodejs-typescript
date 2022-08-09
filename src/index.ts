import express, { Application } from 'express'
import dotenv from 'dotenv'
import Routes from './routes/index'
import cors from 'cors'
import helmet from 'helmet'
import { createStream } from 'rotating-file-stream'
import morgan from 'morgan'

// custom components
import CorsMiddleWare from './middlewares/cors.middleware'
import { connectDb } from './configs/db.connect'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

const accessLogStream = createStream('file.log', {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  compress: 'gzip', // compress rotated files
})

const isProduction = process.env.NODE_ENV === 'production'

const main = () => {
  app.use(
    cors({
      origin: '*',
    })
  )

  app.use(CorsMiddleWare)

  app.use(express.json())

  app.use(helmet())
  app.use(
    isProduction
      ? morgan('combined', { stream: accessLogStream })
      : morgan('dev')
  )

  app.use(Routes)

  connectDb()

  app.listen(port, () => console.log('app listen port' + port))
}

main()
