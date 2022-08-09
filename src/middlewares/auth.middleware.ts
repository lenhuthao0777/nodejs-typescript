import * as jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const AuthMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization']
  const token: string | undefined = authorization?.split(' ')[1]
  !token && res.sendStatus(401)

  jwt.verify(
    token ? token : '',
    String(process.env.ACCESS_TOKEN_SECRET_KEY),
    (error, data) => {
      console.log(error, data)
    }
  )
}
