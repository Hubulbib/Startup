export class EditBodyDto {
  constructor(
    readonly name?: string,
    readonly permissions?: string[],
  ) {}
}
