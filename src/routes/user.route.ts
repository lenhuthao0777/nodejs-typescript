import { VerifyAccessToken, CheckAuth } from '../middlewares/auth.middleware'
import { Router } from 'express'
import {
  GetUser,
  Register,
  Test,
  Login,
  DeleteUser,
  // RefreshToken,
} from '../controllers/user.controller'

const router = Router()

router.get('/user', VerifyAccessToken, GetUser)

router.post('/register', Register)

router.post('/login', Login)

router.delete('/user/delete/:id', CheckAuth, DeleteUser)

// router.post('/refresh_token', RefreshToken)

router.get('/', Test)

export default router
