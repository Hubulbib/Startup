import { model } from 'mongoose'
import { SubscribeEntity } from '../../../core/entites/subscribe.entity'
import { SubscribeRepository } from '../../../core/repositories/SubscribeRepository/subscribe.repository'
import { SubscribeBodyDto } from '../../../core/repositories/SubscribeRepository/dtos/subscribe-body.dto'
import { SubscribeMapper } from '../mappers/subscribe.mapper'

export class SubscribeRepositoryImpl implements SubscribeRepository {
  private readonly subscribeRepository = model('Subscribe')
  private readonly articleRepository = model('Article')

  async subscribe(userId: string, articleId: string, subscribeBodyDto: SubscribeBodyDto): Promise<SubscribeEntity> {
    if (await this.subscribeRepository.findOne({ userId, articleId })) {
      throw Error('Вы уже подписаны на данную статью')
    }
    const article = await this.articleRepository.findById(articleId)

    if (!article) {
      throw Error('Такой статьи не существует')
    }
    return SubscribeMapper.toDomain(
      await this.subscribeRepository.create({ userId, articleId, ...subscribeBodyDto }),
      article,
    )
  }

  async unsubscribe(userId: string, articleId: string): Promise<SubscribeEntity> {
    const existSubscribe = await this.subscribeRepository.findOne({ userId, articleId })
    if (!existSubscribe) {
      throw Error('Вы не были подписаны на данную статью')
    }
    await existSubscribe.deleteOne()
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой статьи не существует')
    }
    return SubscribeMapper.toDomain(existSubscribe, article)
  }
}
