import { Request, Response } from 'express'
import userModel from '../models/user.model'

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

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { user_name, email, password, role } = req.body
    const newUser = await new userModel({
      user_name,
      email,
      password,
      role,
    })
    const user = await newUser.save()
    return res.status(200).json({ data: user })
  } catch (error) {
    return console.log(error)
  }
}
