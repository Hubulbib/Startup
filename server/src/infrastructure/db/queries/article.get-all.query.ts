export const articleGetAllQuery = (hides: string[] = [], limit: number = 10 ** 10) => [
  {
    $match: {
      _id: {
        $not: {
          $in: hides || [],
        },
      },
    },
  },
  {
    $limit: limit || 10 ** 10,
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
