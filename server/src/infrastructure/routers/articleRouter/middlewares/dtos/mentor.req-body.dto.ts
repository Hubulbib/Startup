import { ArticleStatusEnum } from '../../../../db/entities/enums/article-status.enum'

export class MentorReqBodyDto {
  public content
  public tags: string[]
  public mentors: string[]
  public status: ArticleStatusEnum
  // TODO: fix any
  constructor(body: Record<string, any>) {
    this.content = body.content
    this.tags = body.tags
    this.mentors = body.mentors
    if (body.status === ArticleStatusEnum.verification) this.status = body.status
  }
}
