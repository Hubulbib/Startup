import { model } from 'mongoose'
import { Article } from '../entities/article.entity'
import { Subscribe } from '../entities/subscribe.entity'
import { UserRepository } from '../../../core/repositories/UserRepository/user.repository'
import { UserEntity, UserForListEntity } from '../../../core/entites/user.entity'
import { UserMapper } from '../mappers/user.mapper'
import { EditBodyDto } from '../../../core/repositories/UserRepository/dtos/edit-body.dto'
import { GetAllBodyDto } from '../../../core/repositories/UserRepository/dtos/get-all-body.dto'

export class UserRepositoryImpl implements UserRepository {
  private readonly articleRepository = Article
  private readonly subscribeRepository = Subscribe
  private readonly userRepository = model('User')

  async getOneById(userId: string): Promise<UserEntity> {
    let user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Такого пользователя не существует')
    }
    const newUser = {
      ...user,
      userSubscribes: await this.getAllSubscribe(userId),
      articles: await this.getAllArticle(userId),
    }
    return UserMapper.toDomain({ ...newUser, articles: newUser.articles, userSubscribes: newUser.userSubscribes })
  }

  async getAll(getAllBody: GetAllBodyDto): Promise<any[]> {
    //Promise<Promise<UserEntity>[]>
    return await Promise.all(
      (await this.userRepository.find({}, null, { limit: getAllBody.options.interval * getAllBody.options.pages })).map(
        async (el) =>
          UserMapper.toDomain({
            ...el._doc,
            userSubscribes: await this.getAllSubscribe(el._id),
            articles: await this.getAllArticle(el._id),
          }),
      ),
    )
  }

  async getAllForList(getAllBody: GetAllBodyDto): Promise<UserForListEntity[]> {
    return (
      await this.userRepository.find({}, null, { limit: getAllBody.options.interval * getAllBody.options.pages })
    ).map((el) => UserMapper.toDomainForList(el._doc))
  }

  async editOne(userId: string, editBody: EditBodyDto): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Такого пользователя не существует')
    }
    return UserMapper.toDomain(await this.userRepository.findByIdAndUpdate(user._id, editBody, { new: true }))
  }

  async removeOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw Error('Такого пользователя не существует')
    }
    return UserMapper.toDomain(await user.deleteOne({}))
  }

  private async getAllSubscribe(userId: string): Promise<string[]> {
    const existSubscribes = await this.subscribeRepository.find({ userId })
    return existSubscribes.map((el) => el._id.toString())
  }

  private async getAllArticle(userId: string): Promise<string[]> {
    const existsArticles = await this.articleRepository.find({ author: userId })
    return existsArticles.map((el) => el._id)
  }
}