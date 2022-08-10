import { AuthMiddleWare } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { CreateRole } from '../controllers/role.controller'

const router = Router()

router.post('/create_role', AuthMiddleWare, CreateRole)

export default router
