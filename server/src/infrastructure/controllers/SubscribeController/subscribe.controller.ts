import { Response } from 'express'
import { IAuthRequest } from '../../interfaces/auth-request.interface'
import { SubscribeRepositoryImpl } from '../../db/repositories/subscribe.repository.impl'
import { SubscribeService } from '../../../core/services/SubscribeService/subscribe.service'

class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  subscribe = async (req: IAuthRequest, res: Response) => {
    try {
      const { articleId } = req.params
      const subscribeBody = req.body
      res.json(await this.subscribeService.subscribe(req.user.userId, articleId, subscribeBody))
    } catch (err) {
      res.status(500).json(err)
    }
  }

  unsubscribe = async (req: IAuthRequest, res: Response) => {
    try {
      const { articleId } = req.params
      res.json(await this.subscribeService.unsubscribe(req.user.userId, articleId))
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default new SubscribeController(new SubscribeService(new SubscribeRepositoryImpl()))
