export const articleGetAllQuery = (hides: string[], interval: number, pages: number) => [
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
    $skip: interval * (pages - 1) || 0,
  },
  {
    $limit: interval || 10 ** 10,
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