import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const token = (data: any, time?: string) => {
  const accessToken = jwt.sign(
    { ...data },
    String(process.env.ACCESS_TOKEN_SECRET_KEY),
    {
      expiresIn: time,
    }
  )

  return accessToken
}

export const refreshToken = (data: any) => {
  const refreshToken = jwt.sign(
    { ...data },
    String(process.env.REFRESH_TOKEN_SECRET_KEY)
  )
  return refreshToken
}
