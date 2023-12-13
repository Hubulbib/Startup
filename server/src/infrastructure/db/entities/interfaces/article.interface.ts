import { ArticleStatusEnum } from '../enums/article-status.enum.js'

// const article = {
//   _id: mongo id (same as id of short article in catalogue),
//   author: mongo id for a User (ref),
//   content: {
//     recommended: some text that tells user what he really needs to know before starting current article (somewhat of a difficulty level warning),
//     title: string (just a title),
//     body: [{
//       subTitle: string for a theme maxHeaderSize,
//       subTitleText: text content for this concrete subtitle (example: Artile about Array methods => subtitle - one of the methods)
//       // array of such objects
//     }],
//     tasks: [{
//       taskTitle: string,
//       taskText: string
//       // 1 task = 1  object
//     }]
//   },
//   createdAt: automatic server-side field,
//   updatedAt: automatic server-side field, (both of those fields are empty by default on front before sending to the server),
//   status: 'verification' only for now,
//   likes: number,
//   views: number,
//   tags: array of strings
// }

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
  body: IBody[]
  tasks: ITask[]
}

interface IBody {
  subTitle: string
  subTitleText: string
}

interface ITask {
  taskTitle: string
  taskText: string
}
