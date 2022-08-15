import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { ProductType } from 'src/@types/product.type'
import productModel from '../models/product.model'
import fileModel from '../models/file.model'
import { FileType, Thumbnail } from 'src/@types/file.type'

dotenv.config()
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})

export const SetPublicFile = async (fileId: string) => {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    const getUrl = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink',
    })

    return getUrl
  } catch (error) {
    return error
  }
}

export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const body: ProductType = req.body

    const data = await new productModel({
      ...body,
    })

    await data.save()

    res.status(200).json({ message: 'Create product success!', data })
  } catch (error) {
    res.status(500).json({ message: 'Create product failed!', code: error })
  }
}

export const UploadFile = async (req: Request, res: Response) => {
  try {
    const file: FileType | undefined = req.file
    const createFile = await drive.files.create({
      requestBody: {
        name: file?.filename,
        mimeType: file?.mimetype,
      },
      media: {
        mimeType: file?.mimetype,
        body: fs.createReadStream(path.join(file?.path as string)),
      },
    })
    const { data } = createFile

    const publicFile = await SetPublicFile(data.id as string)

    const newImage = await new fileModel<Thumbnail>({
      file_id: data?.id as string,
      file_url: publicFile.data?.webViewLink,
      file_url_dowload: publicFile.data?.webContentLink,
    })

    await newImage.save()

    await fs.unlink(path.join(path.join(file?.path as string)), (err) => {
      if (err) throw err
    })

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
      message: 'Upload file success!',
      file: { ...data, ...publicFile.data },
    })
  } catch (error) {
    res.status(500).json({ message: 'Upload file faild!', code: error })
  }
}

export const DeleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await drive.files.delete({
      fileId: id,
    })

    res.status(200).json({ message: 'Delete file success!' })
  } catch (error) {
    res.status(500).json({ message: 'Delete file failed!', code: error })
  }
}
