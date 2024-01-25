import { type IArticleDoc } from '../../entities/article.entity'
import { UserEntity } from '../../../../core/entites/user.entity'

export interface IArticleToDomain extends IArticleDoc {
  authorData: UserEntity
  mentors: string[]
}
