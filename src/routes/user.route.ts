import { Router } from 'express'
import { GetAllUser } from '../controllers/user.controller'

const router = Router()

router.post('/getUser', GetAllUser)

export default router
