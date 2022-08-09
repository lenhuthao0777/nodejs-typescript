import { Router } from 'express'
import {
  GetAllUser,
  CreateUser,
  GetUser,
  Test,
} from '../controllers/user.controller'

const router = Router()

router.get('/getUser', GetAllUser)

router.post('/create', CreateUser)

router.get('/user', GetUser)

router.get('/', Test)

export default router
