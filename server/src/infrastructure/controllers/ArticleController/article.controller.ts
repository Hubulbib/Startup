import { type Request, type Response } from 'express'
import { type IAuthRequest } from '../../interfaces/auth-request.interface'
import { ArticleService } from '../../../core/services/ArticleService/article.service.js'
import { ArticleRepositoryImpl } from '../../db/repositories/article.repository.impl.js'

class ArticleController {
  constructor(readonly articleService: ArticleService) {}

  createOne = async (req: IAuthRequest, res: Response) => {
    try {
      const articleBody = req.body
      const articleData = await this.articleService.createOne(articleBody)
      res.status(201).json(articleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  getDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const articleDetailData = await this.articleService.getDetail(id)
      res.json(articleDetailData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const { interval, pages } = req.query
      const options = { interval: +interval, pages: +pages }
      const articleData = await this.articleService.getAll({ options })
      res.json(articleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  getOneById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const articleData = await this.articleService.getOneById(id)
      res.json(articleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  editOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const articleBody = req.body
      const articleData = await this.articleService.editOne(id, articleBody)
      return res.json(articleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  incView = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const articleData = await this.articleService.incView(id)
      return res.json(articleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  incLike = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const articleData = await this.articleService.incLike(id)
      return res.json(articleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  decLike = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const articleData = await this.articleService.decLike(id)
      return res.json(articleData)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  removeOne = async (req: IAuthRequest, res: Response) => {
    try {
      const { id } = req.params
      const articleData = await this.articleService.removeOne(id)
      return res.json(articleData)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default new ArticleController(new ArticleService(new ArticleRepositoryImpl()))
