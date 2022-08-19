import { Router } from 'express'
import UserRoute from '../components/user/user.route'
import RoleRoute from '../components/role/role.route'
import ProductRoute from '../components/product/product.route'
import OrderRoute from '../components/order/order.route'
import FileRoute from '../components/file/file.route'

const router = Router()

router.use('/api/v1', UserRoute)

router.use('/api/v1', RoleRoute)

router.use('/api/v1', ProductRoute)

router.use('/api/v1', OrderRoute)

router.use('/api/v1', FileRoute)
export default router
