import { ArticleStatusEnum } from '../entities/enums/article-status.enum'

export const articleGetByStatusQuery = (status: ArticleStatusEnum) => [
  {
    $match: {
      status: {
        $eq: status,
      },
    },
  },
  {
    $set: {
      author: {
        $toObjectId: '$author',
      },
    },
  },
  {
    $lookup: {
      from: 'user',
      localField: 'author',
      foreignField: '_id',
      as: 'author',
    },
  },
]
