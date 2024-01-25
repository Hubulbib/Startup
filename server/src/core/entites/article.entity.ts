import { UserEntity } from './user.entity'

export class ArticleEntity {
  constructor(
    readonly _id: string,
    readonly author: UserEntity,
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
    readonly recommended: Recommended,
    readonly title: string,
    readonly description: string,
  ) {}
}

class Recommended {
  constructor(
    readonly level: ELevelRecommended,
    readonly description: string,
  ) {}
}

export enum ELevelRecommended {
  easy = 'Easy',
  medium = 'Medium',
  hard = 'Hard',
}
