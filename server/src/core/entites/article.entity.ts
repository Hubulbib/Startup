export class ArticleEntity {
  constructor(
    readonly _id: string,
    readonly author: string,
    readonly content: IContent,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly status: string,
    readonly views: number,
    readonly likes: number,
    readonly tags: string[],
    readonly mentors?: string[],
  ) {}
}

class IContent {
  constructor(
    readonly recommended: string[],
    readonly title: string,
    readonly description: string,
  ) {}
}
