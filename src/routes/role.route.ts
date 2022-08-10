import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { CreateRole } from '../controllers/role.controller'

const router = Router()

router.post('/create_role', VerifyAccessToken, CreateRole)

export default router
