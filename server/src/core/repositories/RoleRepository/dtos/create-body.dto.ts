export class CreateBodyDto {
  constructor(
    readonly name: string,
    readonly permissions: string[],
  ) {}
}
