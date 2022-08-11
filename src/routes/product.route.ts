// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { createProduct } from '../controllers/product.controller'

const router = Router()

router.post('/create_product', createProduct)

export default router
