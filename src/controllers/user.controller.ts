import { Response, Request } from 'express'

export const GetUser = (req: Request, res: Response) => {
  try {
    console.log('body', req.body)

    return res.status(200).json({ message: req.body.name })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
