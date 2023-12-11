import { IUserDoc } from '../../entities/user.entity'
import { SubscribeEntity } from '../../../../core/entites/subscribe.entity'

export interface IUserToDomain extends IUserDoc {
  userSubscribes?: string[]
  articles?: string[]
}
