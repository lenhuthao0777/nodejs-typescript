import express, { Application } from 'express'
import dotenv from 'dotenv'
import Routes from './routes/index'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// custom components
import CorsMiddleWare from './middlewares/cors.middleware'
import { connectDb } from './configs/db.connect'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

const main = () => {
  app.use(
    cors({
      origin: '*',
    })
  )

  app.use(CorsMiddleWare)

  app.use(bodyParser.json())

  app.use(helmet())

  app.use(morgan('dev'))

  app.use(Routes)

  connectDb()

  app.listen(port, () => console.log('App listen port ' + port))
}

main()
