// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { Upload } from '../../utils'
import { DeleteFile, UploadFile } from './file.controller'

const router = Router()

router.post('/upload_file', Upload.single('file'), UploadFile)

router.delete('/delete_file/:id', DeleteFile)

export default router
