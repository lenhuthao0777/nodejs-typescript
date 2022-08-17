import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { CreateRole } from '../controllers/role.controller'

const router = Router()

router.post('/create_role', CreateRole)

export default router
