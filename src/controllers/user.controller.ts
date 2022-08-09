import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'
import dotenv from 'dotenv'
import userModel from '../models/user.model'
import { UserType } from 'src/@types/user.type'

dotenv.config()

export const GetAllUser = async (_: Request, res: Response) => {
  try {
    const user = await userModel.find()
    res.status(200).json({
      data: user,
    })
  } catch (error) {
    res.status(500).json({ message: 'get user failed!', code: error })
  }
}

export const Register = async (req: Request, res: Response) => {
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
    res.status(200).json({ data: user })
  } catch (error) {
    res.status(500).json({ message: 'create user failed!', code: error })
  }
}
export const GetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id)
    res.status(200).json({ data: user })
  } catch (error) {
    res.status(500).json({ message: 'get user failed!' + '  ' + error.message })
  }
}

export const Test = (_: Request, res: Response) => {
  try {
    res.send({
      message: 'Hello world!',
    })
  } catch (error) {
    res.status(500).json({
      message: 'error' + error,
    })
  }
}

export const Login = async (req: Request, res: Response) => {
  try {
    const body: UserType = req.body

    const user: UserType | null = await userModel.findOne({
      user_name: body.user_name,
    })

    const checkPass: boolean = await argon2.verify(
      user?.password as string,
      body.password
    )

    if (user && checkPass) {
      const accessToken = await jwt.sign(
        body,
        String(process.env.ACCESS_TOKEN_SECRET_KEY),
        {
          expiresIn: '30s',
        }
      )

      res.status(200).json({
        message: 'Login success!',
        data: user,
        accessToken,
      })
    } else if (!checkPass) {
      res.status(404).json({ message: 'Wrong password!' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed!' + '  ' + error.message })
  }
}
