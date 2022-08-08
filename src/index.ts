import express, { Application } from 'express'
import dotenv from 'dotenv'
import Routes from './routes/index'
import cors from 'cors'

import CorsMiddleWare from './middlewares/cors.middleware'
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

  app.use(express.json())

  app.use(Routes)

  app.listen(port, () => console.log('app listen port' + port))
}

main()
