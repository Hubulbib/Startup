import { SubscribeRepository } from '../../repositories/SubscribeRepository/subscribe.repository'
import { SubscribeBodyDto } from '../../repositories/SubscribeRepository/dtos/subscribe-body.dto'

export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  subscribe = (userId: string, articleId: string, subscribeBodyDto: SubscribeBodyDto) => {
    return this.subscribeRepository.subscribe(userId, articleId, subscribeBodyDto)
  }

  unsubscribe = (userId: string, articleId: string) => {
    return this.subscribeRepository.unsubscribe(userId, articleId)
  }
}
