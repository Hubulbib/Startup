export class UserEntity {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly role: string,
    readonly rating: Rating[],
    readonly avatar: string,
    readonly userSubscribes?: string[],
    readonly articles?: string[],
  ) {}
}

export class UserForListEntity {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly surname: string,
    readonly rating: Rating[],
    readonly avatar: string,
  ) {}
}

class Rating {
  constructor(
    readonly speed: number,
    readonly learn: number,
    readonly polite: number,
  ) {}
}
