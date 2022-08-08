import express, { Application } from 'express'
import dotenv from 'dotenv'
import Routes from './routes/index'
import cors from 'cors'
import { connectDb } from './configs/db.connect'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

connectDb()

app.use(express.json())

app.use(cors())

app.use(Routes)

app.listen(port, () => console.log('app listen port' + port))
