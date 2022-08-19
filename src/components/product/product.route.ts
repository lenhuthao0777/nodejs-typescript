// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import {
  CreateProduct,
  GetProduct,
  DeleteProduct,
  GetProductById,
  EditProduct,
} from './product.controller'

const router = Router()

router.post('/create_product', CreateProduct)

router.get('/product', GetProduct)

router.get('/product/:id', GetProductById)

router.put('/product_edit', EditProduct)

router.delete('/delete_product/:id', DeleteProduct)

export default router
