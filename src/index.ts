import express, { Application } from 'express'
import dotenv from 'dotenv'
import Routes from './routes/index'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

app.use(express.json())

app.use(Routes)

app.listen(port, () => console.log('app listen port' + port))
