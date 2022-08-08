import { createStream } from 'rotating-file-stream'
import { connectDb } from './configs/db.connect'
import express, { Application } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import { join } from 'path'
import routes from './routes'
dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

const isProduction: boolean = process.env.NODE_ENV === 'production'

const accessLogStream = createStream('access.log', {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  compress: 'gzip',
  path: join(__dirname, 'log'),
})
const main = async () => {
  app.use(express.json())

  app.use(helmet())

  app.use(
    isProduction
      ? morgan('combined', { stream: accessLogStream })
      : morgan('dev')
  )

  app.use(routes)

  connectDb()

  app.listen(port, () => console.log('app listen port' + port))
}

main()
