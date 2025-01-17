import { type SubscribeEntity } from '../../entites/subscribe.entity'
import { type SubscribeBodyDto } from './dtos/subscribe-body.dto'

export interface SubscribeRepository {
  subscribe: (userId: string, articleId: string, subscribeBodyDto: SubscribeBodyDto) => Promise<SubscribeEntity>
  unsubscribe: (userId: string, articleId: string) => Promise<SubscribeEntity>
}
