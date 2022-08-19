// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { CreateOrder } from './order.controller'

const router = Router()

router.post('/create_order', CreateOrder)

export default router
