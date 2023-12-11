import { ArticleRepository } from '../../repositories/ArticleRepository/article.repository.js'
import { EditBodyDto } from '../../repositories/ArticleRepository/dtos/edit-body.dto.js'
import { CreateBodyDto } from '../../repositories/ArticleRepository/dtos/create-body.dto.js'
import { GetAllBodyDto } from '../../repositories/ArticleRepository/dtos/get-all-body.dto'

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  createOne = async (createBody: CreateBodyDto) => {
    return await this.articleRepository.createOne(createBody)
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

  removeOne = async (articleId: string) => {
    return await this.articleRepository.removeOne(articleId)
  }
}
