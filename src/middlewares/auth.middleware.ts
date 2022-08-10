import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const AuthMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization']

  if (authorization) {
    const token: string = authorization?.split(' ')[1]
    jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET_KEY),
      (error, _) => {
        error && res.status(403).json({ message: 'Token is not valid!' })
        next()
      }
    )
  } else {
    res.status(401).json({ message: 'You are not authenticated!' })
    next()
  }
}
