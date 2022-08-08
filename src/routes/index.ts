import { Router } from 'express'
import UserRoute from './user.route'

const router = Router()

router.use('/api', UserRoute)

export default router
