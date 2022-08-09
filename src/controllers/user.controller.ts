import { Request, Response } from 'express'
import userModel from '../models/user.model'

export const GetAllUser = async (_: Request, res: Response) => {
  try {
    const user = await userModel.find()
    return res.status(200).json({
      data: user,
    })
  } catch (error) {
    return res.status(500).json({ message: 'get user failed!', code: error })
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
    return res.status(500).json({ message: 'create user failed!', code: error })
  }
}
export const GetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const user = await userModel.findById(id)
    return res.status(200).json({ data: user })
  } catch (error) {
    return res.status(500).json({ message: 'get user failed!', code: error })
  }
}

export const Test = (_: Request, res: Response) => {
  try {
    return res.send({
      message: 'Hello world!',
    })
  } catch (error) {
    return res.status(500).json({
      message: 'error' + error,
    })
  }
}
