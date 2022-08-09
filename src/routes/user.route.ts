import { Router } from 'express'
import {
  GetAllUser,
  Register,
  GetUser,
  Test,
  Login,
} from '../controllers/user.controller'

const router = Router()

router.get('/getUser', GetAllUser)

router.post('/register', Register)

router.get('/user/:id', GetUser)

router.post('/login', Login)

router.get('/', Test)

export default router
