import { Router } from 'express'
import { GetAllUser, CreateUser } from '../controllers/user.controller'

const router = Router()

router.post('/getUser', GetAllUser)

router.post('/create', CreateUser)

export default router
