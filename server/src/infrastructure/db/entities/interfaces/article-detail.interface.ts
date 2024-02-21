import { type Types } from 'mongoose'

export interface IArticleDetail {
  articleId: Types.ObjectId
  body: IBody[]
  tasks: ITask[]
}

interface IBody {
  subTitle: string
  subTitleText: string
  image?: string
}

interface ITask {
  taskTitle: string
  taskText: string
  image?: string
}
