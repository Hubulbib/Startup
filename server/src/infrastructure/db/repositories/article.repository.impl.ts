import { model } from 'mongoose'
import { type ArticleEntity } from '../../../core/entites/article.entity.js'
import { ArticleMapper } from '../mappers/article.mapper.js'
import { type ArticleRepository } from '../../../core/repositories/ArticleRepository/article.repository.js'
import { type CreateBodyDto } from '../../../core/repositories/ArticleRepository/dtos/create-body.dto.js'
import { type EditBodyDto } from '../../../core/repositories/ArticleRepository/dtos/edit-body.dto.js'
import { type GetAllBodyDto } from '../../../core/repositories/ArticleRepository/dtos/get-all-body.dto'
import { type ArticleDetailEntity } from '../../../core/entites/article-detail.entity'
import { ArticleDetailMapper } from '../mappers/article-detail.mapper'
import { UserRepositoryImpl } from './user.repository.impl'

export class ArticleRepositoryImpl implements ArticleRepository {
  private readonly articleRepository = model('Article')
  private readonly articleDetailRepository = model('ArticleDetail')
  private readonly subscribeRepository = model('Subscribe')

  async createOne(createBody: CreateBodyDto): Promise<ArticleEntity> {
    const articleTags = [...new Set(createBody.tags)]
    const article = await this.articleRepository.create({
      ...createBody,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: articleTags,
    })

    const articleDetail = await this.articleDetailRepository.findOne({ articleId: article._id })
    if (articleDetail) throw Error('Такая запись уже существует')

    await this.articleDetailRepository.create({
      articleId: article._id,
      body: createBody.content.detail?.body,
      tasks: createBody.content.detail?.tasks,
    })
    return ArticleMapper.toDomain(article)
  }

  async getDetail(articleId: string): Promise<ArticleDetailEntity> {
    const articleDetail = await this.articleDetailRepository.findOne({ articleId })
    if (!articleDetail) {
      throw Error('Такой записи не существует')
    }
    return ArticleDetailMapper.toDomain(articleDetail)
  }

  async getOneById(articleId: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    const mentors = await this.getAllMentor(articleId)
    const author = await new UserRepositoryImpl().getOneById(article.author)
    return ArticleMapper.toDomain({ ...article._doc, mentors, authorData: author })
  }

  async getAll(getAllBody: GetAllBodyDto): Promise<ArticleEntity[]> {
    return await Promise.all(
      (
        await this.articleRepository.find({ _id: { $not: { $in: getAllBody.options.hides } } }, null, {
          limit: getAllBody.options.interval * getAllBody.options.pages,
        })
      ).map(async (el) =>
        ArticleMapper.toDomain({
          ...el._doc,
          authorData: await new UserRepositoryImpl().getOneById(el._id),
          mentors: await this.getAllMentor(el._id),
        }),
      ),
    )
  }

  async getAllByMentor(mentorId: string): Promise<ArticleEntity[]> {
    return this.articleRepository.find({ author: mentorId })
  }

  async editOne(articleId: string, editBody: EditBodyDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    const articleDetail = await this.articleDetailRepository.findOne({ articleId })
    if (!articleDetail) throw Error('Такой записи не существует')
    await this.articleDetailRepository.findByIdAndUpdate(
      articleDetail._id,
      { ...editBody.content?.detail },
      { new: true },
    )
    return ArticleMapper.toDomain(
      await this.articleRepository.findByIdAndUpdate(
        article._id,
        { ...editBody, content: { ...article.content, ...editBody.content }, updatedAt: new Date() },
        { new: true },
      ),
    )
  }

  async incView(articleId: string): Promise<number> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    article.views++
    await article.save()
    return article.views
  }

  async incLike(articleId: string): Promise<number> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    article.likes++
    await article.save()
    return article.likes
  }

  async decLike(articleId: string): Promise<number> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    if (article.likes > 0) {
      article.likes--
      await article.save()
    }
    return article.likes
  }

  async removeOne(articleId: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует')
    }
    const articleDetail = await this.articleDetailRepository.findOne({ articleId })
    if (!articleDetail) {
      throw Error('Такой записи не существует')
    }
    await articleDetail.deleteOne()
    return ArticleMapper.toDomain(await article.deleteOne())
  }

  private async getAllMentor(articleId: string): Promise<string[]> {
    const subscribes = await this.subscribeRepository.find({ articleId })
    return subscribes.map((el) => el.userId)
  }
}
