import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const VerifyAccessToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization']

  if (authorization) {
    const token: string = authorization?.split(' ')[1]
    jwt.verify(
      token,
      String(process.env.ACCESS_TOKEN_SECRET_KEY),
      (error, user) => {
        error && res.status(403).json({ message: 'Token is not valid!' })
        req.user = user
        next()
      }
    )
  } else {
    res.status(401).json({ message: 'You are not authenticated!' })
  }
}

export const RefreshAccessToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  VerifyAccessToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      res.status(403).json({ message: 'You are not allowed to delete orther!' })
    } else {
      next()
    }
  })
}
