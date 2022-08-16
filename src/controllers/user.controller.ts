import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'
import dotenv from 'dotenv'

// Component
import userModel from '../models/user.model'
import roleModel from '../models/role.model'
// import tokenModel from '../models/token.model'
import { UserType } from 'src/@types/user.type'
// import { TokenType } from 'src/@types/token.type'
import { token, refreshToken } from '../utils'
import { RoleType } from 'src/@types/role.type'

dotenv.config()

export const GetAllUser = async (_: Request, res: Response) => {
  try {
    const user = await userModel.find()
    res.status(200).json({
      data: user,
    })
  } catch (error) {
    res.status(500).json({ message: 'get user failure!', code: error })
  }
}

export const Register = async (req: Request, res: Response) => {
  try {
    const {
      user_name,
      email,
      password,
      role_id,
      feed_back_id,
      product_id,
      country,
      phone_number,
    } = req.body
    const hash: string = await argon2.hash(password)
    const newUser = await new userModel({
      user_name,
      email,
      password: hash,
      country,
      phone_number,
      role_id,
      feed_back_id,
      product_id,
    })
    const user = await newUser.save()
    res.status(200).json({ data: user })
  } catch (error) {
    res.status(500).json({ message: 'create user failure!', code: error })
  }
}

export const GetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id)
    res.status(200).json({ data: user })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'get user failure!' + '  ' + error.message })
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

    const user = await userModel.findOne<UserType>({
      user_name: body.user_name,
    })

    const checkPass: boolean = await argon2.verify(
      user?.password as string,
      body.password
    )

    const role = await roleModel.findById<RoleType>({
      _id: user?.role_id,
    })

    if (user && checkPass) {
      // TODO REFACTOR

      // const accessToken = await jwt.sign(
      //   { id: user._id, admin: user.role_id },
      //   String(process.env.ACCESS_TOKEN_SECRET_KEY),
      //   {
      //     expiresIn: '30s',
      //   }
      // )

      const rfToken: string = refreshToken({
        id: user._id,
        admin: user.role_id,
      })

      //TODO

      // const newToken = await new tokenModel<TokenType>({
      //   token: rfToken,
      // })

      // await newToken.save()

      res.status(200).json({
        message: 'Login success!',
        data: {
          phone_number: user.phone_number,
          country: user.country,
          email: user.email,
          role_name: role?.role_name,
          role_number: role?.role_number,
          accessToken: token({ id: user._id, admin: user.role_id }, '30d'),
          refreshToken: rfToken,
        },
      })
    } else if (!checkPass) {
      res.status(404).json({ message: 'Wrong password!' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failure!' + '  ' + error.message })
  }
}

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await userModel.deleteOne({ id })

    res.status(200).json({ message: 'Delete succes!' })
  } catch (error) {
    res.status(500).json({ message: 'Delete failure!' + '  ' + error.message })
  }
}

export const RefreshToken = async (req: Request | any, res: Response) => {
  try {
    const { refreshToken } = req.body

    // const tokens: TokenType | null = await tokenModel.findOne({
    //   token: refreshToken,
    // })

    !refreshToken && res.status(401).json({ message: 'RefreshToken is valid!' })

    jwt.verify(
      refreshToken,
      String(process.env.ACCESS_TOKEN_SECRET_KEY),
      (error: any, user: any) => {
        if (error) res.status(403)
        const newAccessToken = token({ id: user.id, admin: user.admin }, '30d')
        res.status(200).json({ accessToken: newAccessToken })
      }
    )

    // !checkToken &&
    //   res.status(401).json({ message: 'You are not authenticated!' })

    // if (refreshToken && checkToken) {
    //   res.status(200).json({ message: 'Refresh token success!' })
    // }
    // res.json({ refreshToken })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Refresh token failure!' + '  ' + error.message })
  }
}
