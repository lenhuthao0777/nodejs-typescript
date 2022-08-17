import { Request, Response } from 'express'
import dotenv from 'dotenv'
import Role from '../models/role.model'

dotenv.config()

export const CreateRole = async (req: Request, res: Response) => {
  try {
    const { role_number, role_name } = req.body
    const newRole = new Role({
      role_number,
      role_name,
    })

    const role = await newRole.save()

    res.status(200).json({ message: 'Create role success!', data: role })
  } catch (error) {
    res.status(500).json({ message: 'Create role failure! ' + error })
  }
}
