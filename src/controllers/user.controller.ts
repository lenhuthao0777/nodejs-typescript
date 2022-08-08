import { Request, Response } from 'express'
export const GetAllUser = (req: Request, res: Response) => {
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
}
