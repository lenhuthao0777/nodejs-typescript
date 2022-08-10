import { AuthMiddleWare } from '../middlewares/auth.middleware'
import { Router } from 'express'
import {
  GetAllUser,
  Register,
  GetUser,
  Test,
  Login,
} from '../controllers/user.controller'

const router = Router()

router.get('/user', AuthMiddleWare, GetAllUser)

router.post('/register', Register)

router.get('/user/:id', AuthMiddleWare, GetUser)

router.post('/login', Login)

router.get('/', Test)

export default router
