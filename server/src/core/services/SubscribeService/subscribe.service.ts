import { type SubscribeRepository } from '../../repositories/SubscribeRepository/subscribe.repository'
import { type SubscribeBodyDto } from '../../repositories/SubscribeRepository/dtos/subscribe-body.dto'

export class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  subscribe = async (userId: string, articleId: string, subscribeBodyDto: SubscribeBodyDto) => {
    return await this.subscribeRepository.subscribe(userId, articleId, subscribeBodyDto)
  }

  unsubscribe = async (userId: string, articleId: string) => {
    return await this.subscribeRepository.unsubscribe(userId, articleId)
  }
}
