import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

const port = process.env.PORT || 3100

app.use(express.json())

app.post('/', (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body
    return res.status(200).json({
      data: {
        user_name,
        password,
      },
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

app.listen(port, () => console.log('app listen port' + port))
