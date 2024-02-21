import { Article, type IArticleDoc } from '../entities/article.entity.js'
import { ArticleEntity } from '../../../core/entites/article.entity.js'
import { type IArticleToDomain } from './interfaces/article-to-domain.interface'

export class ArticleMapper {
  public static toDomain(entity: IArticleToDomain): ArticleEntity {
    return new ArticleEntity(
      entity._id,
      entity.authorData,
      entity.preview,
      entity.content,
      entity.createdAt,
      entity.updatedAt,
      entity.status,
      entity.views,
      entity.likes,
      entity.tags,
      entity.mentors,
    )
  }

  public static toEntity(domain: ArticleEntity): IArticleDoc {
    return new Article({ ...domain })
  }
}
