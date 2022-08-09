import { Request, Response } from 'express'
import userModel from '../models/user.model'
import argon2 from 'argon2'

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
    const { user_name, email, password, role, country_code, phone_number } =
      req.body
    const hash: string = await argon2.hash(password)
    const newUser = await new userModel({
      user_name,
      email,
      password: hash,
      country_code,
      phone_number,
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
    const { id } = req.params
    const user = await userModel.findById(id)
    return res.status(200).json({ data: user })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'get user failed!' + '  ' + error.message })
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
