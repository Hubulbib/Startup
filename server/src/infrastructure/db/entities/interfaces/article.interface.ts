import { ArticleStatusEnum } from '../enums/article-status.enum.js'

export interface IArticle {
  _id: string
  author: string
  content: IContent
  createdAt: Date
  updatedAt: Date
  status: ArticleStatusEnum
  likes: number
  views: number
  tags: string[]
}

interface IContent {
  recommended: string[]
  title: string
  description: string
}
