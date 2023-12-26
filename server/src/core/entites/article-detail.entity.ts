export class ArticleDetailEntity {
  constructor(
    readonly articleId: string,
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
