import { Router } from 'express'
import { GetUser } from '../controllers/user.controller'
const router: Router = Router()

router.get('/', GetUser)

export default router
