import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { ProductType } from 'src/@types/product.type'

// import productModel from '../models/product.model'

dotenv.config()

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body: ProductType = req.body
    res.status(200).json({ message: 'abc', body: body.name })
  } catch (error) {
    res.status(500).json({ message: 'Create product failed!', code: error })
  }
}
