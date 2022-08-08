import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  return res.json({ body: req.body })
})

app.listen(port, () => console.log('app listen port' + port))
