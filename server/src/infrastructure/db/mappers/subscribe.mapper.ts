import { type ISubscribeDoc, Subscribe } from '../entities/subscribe.entity'
import { SubscribeEntity } from '../../../core/entites/subscribe.entity'

export class SubscribeMapper {
  public static toDomain(entity: ISubscribeDoc, articleId: string): SubscribeEntity {
    return new SubscribeEntity(entity._id, entity.price, entity.message, articleId)
  }

  public static toEntity(domain: SubscribeEntity): ISubscribeDoc {
    return new Subscribe({
      ...domain,
      articleId: domain.articleId,
    })
  }
}
