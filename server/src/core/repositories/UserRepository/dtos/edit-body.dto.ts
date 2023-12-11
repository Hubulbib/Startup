export class EditBodyDto {
  constructor(
    readonly name?: string,
    readonly surname?: string,
    readonly email?: string,
    readonly password?: string,
    readonly rating?: Rating[],
    readonly avatar?: string,
    readonly userSubscribes?: string[],
  ) {}
}

class Rating {
  constructor(
    readonly speed?: number,
    readonly learn?: number,
    readonly polite?: number,
  ) {}
}
