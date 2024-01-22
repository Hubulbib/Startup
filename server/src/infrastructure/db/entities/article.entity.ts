import { type Document, model, Schema } from 'mongoose'
import { type IArticle } from './interfaces/article.interface.js'
import { ArticleStatusEnum } from './enums/article-status.enum.js'
import { ELevelRecommended } from '../../../core/entites/article.entity'

export type IArticleDoc = Document<any, any, IArticle> & IArticle

const schema = new Schema<IArticle>({
  author: { type: String, required: true },
  content: {
    recommended: {
      level: { type: String, required: true, enum: Object.values(ELevelRecommended) },
      description: { type: String, required: true },
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: Object.values(ArticleStatusEnum),
    default: ArticleStatusEnum.verification,
  },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  tags: { type: [String], required: true },
})

export const Article = model('Article', schema)
