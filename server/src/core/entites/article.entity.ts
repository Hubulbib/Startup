export class ArticleEntity {
  constructor(
    readonly _id: string,
    readonly author: string,
    readonly content: Content,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly status: string,
    readonly views: number,
    readonly likes: number,
    readonly tags: string[],
    readonly mentors?: string[],
  ) {}
}

class Content {
  constructor(
    readonly recommended: string[],
    readonly title: string,
    readonly body: Body[],
    readonly tasks: Task[],
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
