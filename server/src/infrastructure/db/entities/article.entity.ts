import { Document, model, Schema } from 'mongoose'
import { IArticle } from './interfaces/article.interface.js'
import { ArticleStatusEnum } from './enums/article-status.enum.js'

export type IArticleDoc = Document<any, any, IArticle> & IArticle

const schema = new Schema<IArticle>({
  author: { type: String, required: true },
  content: {
    // level: {
    //     type: String,
    //     required: true,
    //     enum: ['easy', 'moderate', 'hard']
    // },
    recommended: { type: [String] },
    title: { type: String, required: true },
    body: [
      {
        subTitle: { type: String, required: true },
        subTitleText: { type: String, required: true },
        _id: false,
        //перевернуть на true
      },
    ],
    tasks: [
      {
        taskTitle: { type: String, required: true },
        taskText: { type: String, required: true },
        _id: false,
        //перевернуть на true
      },
    ],
    _id: false,
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
  tags: { type: [String], required: true }, //отдельная валидация фронт + бек + фильтрация
})

export const Article = model('Article', schema)
