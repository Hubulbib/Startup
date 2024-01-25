import { type ArticleEntity } from '../../entites/article.entity.js'
import { type CreateBodyDto } from './dtos/create-body.dto.js'
import { type EditBodyDto } from './dtos/edit-body.dto.js'
import { type GetAllBodyDto } from './dtos/get-all-body.dto'
import { type ArticleDetailEntity } from '../../entites/article-detail.entity'

export interface ArticleRepository {
  createOne: (createBody: CreateBodyDto) => Promise<ArticleEntity>
  getAll: (getAllBody: GetAllBodyDto) => Promise<ArticleEntity[]>
  getAllByMentor: (mentorId: string) => Promise<ArticleEntity[]>
  getOneById: (articleId: string) => Promise<ArticleEntity>
  editOne: (articleId: string, editBody: EditBodyDto) => Promise<ArticleEntity>
  incView: (articleId: string) => Promise<number>
  incLike: (articleId: string) => Promise<number>
  decLike: (articleId: string) => Promise<number>
  removeOne: (articleId: string) => Promise<ArticleEntity>
  getDetail: (articleId: string) => Promise<ArticleDetailEntity>
}
