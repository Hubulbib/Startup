import { type ELevelRecommended } from '../../../entites/article.entity'

export class CreateBodyDto {
  constructor(
    readonly author: string,
    readonly content: Content,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
    readonly status: string = 'verification',
    readonly views: number = 0,
    readonly tags: string[] = [],
  ) {}
}

class Content {
  constructor(
    readonly recommended: Recommended,
    readonly title: string,
    readonly description: string,
    readonly detail: ArticleDetail,
  ) {}
}

class Recommended {
  constructor(
    readonly level: ELevelRecommended,
    readonly description: string,
  ) {}
}

class ArticleDetail {
  constructor(
    readonly body: Body,
    readonly tasks: Task,
  ) {}
}

class Body {
  constructor(
    readonly subTitle: string,
    readonly subTitleText: string,
  ) {}
}

class Task {
  constructor(
    readonly taskTitle: string,
    readonly taskText: string,
  ) {}
}
