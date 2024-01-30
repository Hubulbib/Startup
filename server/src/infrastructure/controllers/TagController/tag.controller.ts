import { type Response } from 'express'
import { type IAuthRequest } from '../../interfaces/auth.request.interface'
import { TagService } from '../../../core/services/TagService/tag.service'
import { TagRepositoryImpl } from '../../db/repositories/tag.repository.impl'

class TagController {
  constructor(private readonly tagService: TagService) {}

  createOne = async (req: IAuthRequest, res: Response) => {
    try {
      const tagBody = req.body
      const tagData = await this.tagService.createOne(tagBody)
      res.status(201).json(tagData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  getAll = async (req: IAuthRequest, res: Response) => {
    try {
      const roleData = await this.tagService.getAll()
      res.json(roleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  editOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { name } = req.params
      const tagBody = req.body
      await this.tagService.editOne(name, tagBody)
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  removeOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { name } = req.params
      await this.tagService.removeOne(name)
      res.end()
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
}

export default new TagController(new TagService(new TagRepositoryImpl()))
