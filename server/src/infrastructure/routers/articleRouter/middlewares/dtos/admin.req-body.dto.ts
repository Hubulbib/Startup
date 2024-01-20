import { type ArticleStatusEnum } from '../../../../db/entities/enums/article-status.enum'

export class AdminReqBodyDto {
  public status: ArticleStatusEnum

  constructor(body: Record<string, any>) {
    this.status = body.status
  }
}
