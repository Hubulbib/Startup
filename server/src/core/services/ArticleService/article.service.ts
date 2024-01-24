import { type ArticleRepository } from '../../repositories/ArticleRepository/article.repository.js'
import { type EditBodyDto } from '../../repositories/ArticleRepository/dtos/edit-body.dto.js'
import { type CreateBodyDto } from '../../repositories/ArticleRepository/dtos/create-body.dto.js'
import { type GetAllBodyDto } from '../../repositories/ArticleRepository/dtos/get-all-body.dto'

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  createOne = async (createBody: CreateBodyDto) => {
    return await this.articleRepository.createOne(createBody)
  }

  getDetail = async (articleId: string) => {
    return await this.articleRepository.getDetail(articleId)
  }

  getAll = async (getAllBody: GetAllBodyDto) => {
    return await this.articleRepository.getAll(getAllBody)
  }

  getOneById = async (articleId: string) => {
    return await this.articleRepository.getOneById(articleId)
  }

  editOne = async (articleId: string, editBody: EditBodyDto) => {
    return await this.articleRepository.editOne(articleId, editBody)
  }

  incView = async (articleId: string) => {
    return await this.articleRepository.incView(articleId)
  }

  incLike = async (articleId: string) => {
    return await this.articleRepository.incLike(articleId)
  }

  decLike = async (articleId: string) => {
    return await this.articleRepository.decLike(articleId)
  }

  removeOne = async (articleId: string) => {
    return await this.articleRepository.removeOne(articleId)
  }
}
