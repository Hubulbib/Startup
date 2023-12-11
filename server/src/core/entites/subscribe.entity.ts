export class SubscribeEntity {
  constructor(
    readonly _id: string,
    readonly price: number,
    readonly message: string,
    readonly articleId: string,
  ) {}
}
