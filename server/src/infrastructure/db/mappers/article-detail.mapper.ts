import { ArticleDetail, IArticleDetailDoc } from '../entities/article-detail.entity'
import { ArticleDetailEntity } from '../../../core/entites/article-detail.entity'

export class ArticleDetailMapper {
  public static toDomain(entity: IArticleDetailDoc): ArticleDetailEntity {
    return new ArticleDetailEntity(entity.articleId.toString(), entity.body, entity.tasks)
  }

  public static toEntity(domain: ArticleDetailEntity): IArticleDetailDoc {
    return new ArticleDetail({ ...domain })
  }
}
