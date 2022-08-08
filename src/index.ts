import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  return res.send({ body: 'hello' })
})

app.listen(port, () => console.log('app listen port' + port))
