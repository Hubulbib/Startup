import { type ELevelRecommended } from '../../../entites/article.entity'

export class EditBodyDto {
  constructor(
    readonly author?: string,
    readonly preview?: string,
    readonly content?: Content,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly status?: string,
    readonly views?: number,
    readonly tags?: string[],
  ) {}
}

class Content {
  constructor(
    readonly recommended?: Recommended,
    readonly title?: string,
    readonly description?: string,
    readonly detail?: ArticleDetail,
  ) {}
}

class Recommended {
  constructor(
    readonly level?: ELevelRecommended,
    readonly description?: string,
  ) {}
}

class ArticleDetail {
  constructor(
    readonly body?: Body,
    readonly tasks?: Task,
  ) {}
}

class Body {
  constructor(
    readonly subTitle?: string,
    readonly subTitleText?: string,
    readonly image?: string,
  ) {}
}

class Task {
  constructor(
    readonly taskTitle?: string,
    readonly taskText?: string,
    readonly image?: string,
  ) {}
}
