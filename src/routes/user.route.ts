import { VerifyAccessToken, CheckAuth } from '../middlewares/auth.middleware'
import { Router } from 'express'
import {
  GetAllUser,
  Register,
  GetUser,
  Test,
  Login,
  DeleteUser,
} from '../controllers/user.controller'

const router = Router()

router.get('/user', VerifyAccessToken, GetAllUser)

router.post('/register', Register)

router.get('/user/:id', VerifyAccessToken, GetUser)

router.post('/login', Login)

router.delete('/user/delete/:id', CheckAuth, DeleteUser)

router.get('/', Test)

export default router
