import { ArticleStatusEnum } from '../enums/article-status.enum.js'
import {ELevelRecommended} from "../../../../core/entites/article.entity";

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
  recommended: IRecommended
  title: string
  description: string
}

interface IRecommended {
  level: ELevelRecommended
  description: string
}