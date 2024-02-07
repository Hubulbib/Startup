export class EditBodyDto {
  constructor(
    readonly name?: string,
    readonly surname?: string,
    readonly email?: string,
    readonly password?: string,
    readonly rating?: number[],
    readonly avatar?: string,
    readonly messages?: { [key: string]: string }[],
    readonly defaultMessages?: { [key: string]: string }[],
    readonly userSubscribes?: string[],
    readonly likes?: string[],
    readonly hides?: string[],
  ) {}
}

export class EditMessageListBody {
  constructor(
    readonly messages: object[],
    readonly defaultMessages: object[],
  ) {}
}
