// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import {
  CreateProduct,
  UploadFile,
  DeleteFile,
  GetProduct,
  DeleteProduct,
} from '../controllers/product.controller'
import { Upload } from '../utils'

const router = Router()

router.post('/create_product', CreateProduct)

router.post('/upload_file', Upload.single('file'), UploadFile)

router.delete('/delete_file/:id', DeleteFile)

router.get('/product', GetProduct)

router.delete('/delete_product/:id', DeleteProduct)

export default router
