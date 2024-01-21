import { type IArticleDoc } from '../../entities/article.entity'

export interface IArticleToDomain extends IArticleDoc {
  mentors: string[]
}
