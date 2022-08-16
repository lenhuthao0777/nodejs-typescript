// import { VerifyAccessToken } from '../middlewares/auth.middleware'
import { Router } from 'express'
import { CreateOrder } from '../controllers/order.controller'

const router = Router()

router.post('/create_order', CreateOrder)

export default router
