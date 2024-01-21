import { type Document, model, Schema } from 'mongoose'
import { type IArticleDetail } from './interfaces/article-detail.interface'

export type IArticleDetailDoc = Document<any, any, IArticleDetail> & IArticleDetail

const schema = new Schema<IArticleDetail>({
  articleId: { type: Schema.Types.ObjectId, unique: true },
  body: [
    {
      subTitle: { type: String },
      subTitleText: { type: String },
    },
  ],
  tasks: [
    {
      taskTitle: { type: String },
      taskText: { type: String },
    },
  ],
})

export const ArticleDetail = model('ArticleDetail', schema)
