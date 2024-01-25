import { type Response } from 'express'
import { type IAuthRequest } from '../../interfaces/auth.request.interface'
import { RoleService } from '../../../core/services/RoleService/role.service'
import { RoleRepositoryImpl } from '../../db/repositories/role.repository.impl'

class RoleController {
  constructor(readonly roleService: RoleService) {}

  createOne = async (req: IAuthRequest, res: Response) => {
    try {
      const roleBody = req.body
      const roleData = await this.roleService.createOne(roleBody)
      res.status(201).json(roleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getAll = async (req: IAuthRequest, res: Response) => {
    try {
      const roleData = await this.roleService.getAll()
      res.json(roleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getByName = async (req: IAuthRequest, res: Response) => {
    try {
      const { name } = req.params
      const roleData = await this.roleService.getByName(name)
      res.json(roleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  editOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { name } = req.params
      const roleBody = req.body
      await this.roleService.editOne(name, roleBody)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  removeOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { name } = req.params
      await this.roleService.removeOne(name)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default new RoleController(new RoleService(new RoleRepositoryImpl()))
