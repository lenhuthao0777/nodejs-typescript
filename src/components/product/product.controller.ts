import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { ProductType } from 'src/@types/product.type'
import productModel from './product.model'

dotenv.config()

export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const body: ProductType = req.body

    const data = await new productModel({
      ...body,
    })

    await data.save()

    res.status(200).json({ message: 'Create product success!', data })
  } catch (error) {
    res.status(500).json({ message: 'Create product failure!', code: error })
  }
}

export const GetProduct = async (req: Request, res: Response) => {
  try {
    const totalItem = await productModel.find()

    const data = await productModel
      .find()
      .skip((Number(req.query.page) - 1) * Number(req.query.page_size))
      .limit(Number(req.query.page_size))

    res.json({
      message: 'Get product success!',
      data,
      current_page: Number(req.query.page),
      limit: Number(req.query.page_size),
      total_page: Math.ceil(totalItem.length / Number(req.query.page_size)),
    })
  } catch (error) {
    res.status(500).json({ message: 'Get product failure!', code: error })
  }
}

export const GetProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await productModel.findOne({ product_id: id })

    res.json({
      message: 'Get product success!',
      data,
    })
  } catch (error) {
    res.status(500).json({ message: 'Get product failure!', code: error })
  }
}

export const DeleteProduct = async (req: Request, res: Response) => {
  try {
    await productModel.deleteOne({ product_id: req.params.id })
    res.status(200).json({ message: 'Delete succes!' })
  } catch (error) {
    res.status(500).json({ message: 'Delete product failure!', code: error })
  }
}

export const EditProduct = async (req: Request, res: Response) => {
  try {
    const body: ProductType = req.body

    productModel.updateOne(
      { product_id: body.product_id },
      { $set: { ...body } }
    )

    res.status(200).json({ message: 'Edit succes!' })
  } catch (error) {
    res.status(500).json({ message: 'Edit product failure!', code: error })
  }
}
