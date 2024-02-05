import { type Request, type Response } from 'express'
import { UserService } from '../../../core/services/UserService/user.service.js'
import { UserRepositoryImpl } from '../../db/repositories/user.repository.impl.js'
import { type IAuthRequest } from '../../interfaces/auth.request.interface'
import { EUserRole } from '../../db/entities/enums/user-role.enum'

class UserController {
  constructor(readonly userService: UserService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const { interval, pages } = req.query
      const options = { interval: +interval, pages: +pages }
      const userData = await this.userService.getAll({ options })
      res.json(userData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  getAllForList = async (req: Request, res: Response) => {
    try {
      const { interval, pages } = req.query
      const options = { interval: +interval, pages: +pages }
      const userData = await this.userService.getAllForList({ options })
      console.log(userData)
      res.json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getOneById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const userData = await this.userService.getOneById(id)
      res.json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  editOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const userBody = req.body
      if (req.user.role !== EUserRole.mentor && (userBody?.messages || userBody?.defaultMessages)) {
        return res.status(401).end()
      }
      await this.userService.editOne(id, userBody)
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  removeOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const userData = await this.userService.removeOne(id)
      return res.json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default new UserController(new UserService(new UserRepositoryImpl()))
