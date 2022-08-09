import { Request, Response } from 'express'
import userModel from '../models/user.model'

export const GetAllUser = async (_: Request, res: Response) => {
  try {
    const user = await userModel.find()
    return res.status(200).json({
      data: user,
    })
  } catch (error) {
    return res.status(500).json({ message: 'get user failed!' })
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
    return res.status(500).json({ message: 'create user failed!' })
  }
}
export const GetUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body
    const user = await userModel.findById(_id)
    return res.status(200).json({ data: user })
  } catch (error) {
    return res.status(500).json({ message: 'get user failed!' })
  }
}

export const Test = (_: Request, res: Response) => {
  try {
    return res.send({
      message: 'Hello world!',
    })
  } catch (erroe) {
    return res.status(500).json({
      message: 'error',
    })
  }
}
