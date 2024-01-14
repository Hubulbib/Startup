export class EditBodyDto {
  constructor(
    readonly name?: string,
    readonly surname?: string,
    readonly email?: string,
    readonly password?: string,
    readonly rating?: number[],
    readonly avatar?: string,
    readonly userSubscribes?: string[],
  ) {}
}
