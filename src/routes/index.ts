import { Router } from 'express'
import UserRoute from './user.route'
import RoleRoute from './role.route'
import ProductRoute from './product.route'
import OrderRoute from './order.route'

const router = Router()

router.use('/api/v1', UserRoute)

router.use('/api/v1', RoleRoute)

router.use('/api/v1', ProductRoute)

router.use('/api/v1', OrderRoute)

export default router
