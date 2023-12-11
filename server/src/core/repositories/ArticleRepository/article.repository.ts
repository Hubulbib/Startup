import { ArticleEntity } from '../../entites/article.entity.js'
import { CreateBodyDto } from './dtos/create-body.dto.js'
import { EditBodyDto } from './dtos/edit-body.dto.js'
import { GetAllBodyDto } from './dtos/get-all-body.dto'

export interface ArticleRepository {
  createOne(createBody: CreateBodyDto): Promise<ArticleEntity>
  getAll(getAllBody: GetAllBodyDto): Promise<ArticleEntity[]>
  getOneById(articleId: string): Promise<ArticleEntity>
  editOne(articleId: string, editBody: EditBodyDto): Promise<ArticleEntity>
  removeOne(articleId: string): Promise<ArticleEntity>
}
