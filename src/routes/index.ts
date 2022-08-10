import { Router } from 'express'
import UserRoute from './user.route'
import RoleRoute from './role.route'

const router = Router()

router.use('/api/v1', UserRoute)

router.use('/api/v1', RoleRoute)

export default router
