import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import multer from 'multer'

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

export const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, 'src/uploads')
    return file
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  },
})

export const Upload = multer({ storage })
