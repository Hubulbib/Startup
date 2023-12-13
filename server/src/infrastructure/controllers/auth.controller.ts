import { Request, Response } from 'express'
import { AuthService } from '../../core/services/AuthService/auth.service.js'
import { AuthRepositoryImpl } from '../db/repositories/auth.repository.impl.js'

class AuthController {
  constructor(readonly authService: AuthService) {}

  createOne = async (req: Request, res: Response) => {
    try {
      const authBody = req.body
      const authData = await this.authService.createOne(authBody)
      res.json(authData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

//   {
//     "_id": "65637d5ae4b52354692340a2",
//     "name": "Test1",
//     "surname": "Test1",
//     "email": "test@test1.ru",
//     "password": "test",
//     "role": "admin",
//     "rating": [],
//     "userSubscribes": [],
//     "articles": []
// }

  auth = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const authData = await this.authService.auth(email, password)
      return res.json(authData)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default new AuthController(new AuthService(new AuthRepositoryImpl()))
