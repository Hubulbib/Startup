import { model } from 'mongoose'
import { ArticleEntity } from '../../../core/entites/article.entity.js'
import { ArticleMapper } from '../mappers/article.mapper.js'
import { ArticleRepository } from '../../../core/repositories/ArticleRepository/article.repository.js'
import { CreateBodyDto } from '../../../core/repositories/ArticleRepository/dtos/create-body.dto.js'
import { EditBodyDto } from '../../../core/repositories/ArticleRepository/dtos/edit-body.dto.js'
import { GetAllBodyDto } from '../../../core/repositories/ArticleRepository/dtos/get-all-body.dto'
import { ArticleDetailEntity } from '../../../core/entites/article-detail.entity'
import { ArticleDetailMapper } from '../mappers/article-detail.mapper'

export class ArticleRepositoryImpl implements ArticleRepository {
  private readonly articleRepository = model('Article')
  private readonly articleDetailRepository = model('ArticleDetail')
  private readonly subscribeRepository = model('Subscribe')

  async createOne(createBody: CreateBodyDto): Promise<ArticleEntity> {
    console.log(createBody)
    const articleTags = [...new Set(createBody.tags)]
    const article = await this.articleRepository.create({ ...createBody, tags: articleTags })

    const articleDetail = await this.articleDetailRepository.findOne({ articleId: article._id })
    if (articleDetail) throw Error('Такая запись уже существует')

    await this.articleDetailRepository.create({
      articleId: article._id,
      body: createBody.content.detail.body,
      tasks: createBody.content.detail.tasks,
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
    const article = {
      ...(await this.articleRepository.findById(articleId)),
      mentors: await this.getAllMentor(articleId),
    }
    if (!article) {
      throw Error('Такой записи не существует')
    }

    return ArticleMapper.toDomain({ ...article._doc, mentors: article.mentors })
  }

  async getAll(getAllBody: GetAllBodyDto): Promise<ArticleEntity[]> {
    return await Promise.all(
      (
        await this.articleRepository.find({}, null, { limit: getAllBody.options.interval * getAllBody.options.pages })
      ).map(async (el) => ArticleMapper.toDomain({ ...el._doc, mentors: await this.getAllMentor(el._id) })),
    )
  }

  async editOne(articleId: string, editBody: EditBodyDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findById(articleId)
    if (!article) {
      throw Error('Такой записи не существует article')
    }
    const articleDetail = await this.articleDetailRepository.findOne({ articleId })
    if (!articleDetail) throw Error('Такой записи не существует article-detail')
    articleDetail.body = editBody.content.detail.body
    articleDetail.tasks = editBody.content.detail.tasks
    await articleDetail.save()

    return ArticleMapper.toDomain(
      await this.articleRepository.findByIdAndUpdate(
        article._id,
        { ...editBody, updatedAt: new Date() },
        { new: true },
      ),
    )
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
