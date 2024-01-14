import { ArticleStatusEnum } from '../../../../db/entities/enums/article-status.enum'

export class AdminReqBodyDto {
  public status: ArticleStatusEnum
  constructor(body: object) {
    this.status = body['status']
  }
}
