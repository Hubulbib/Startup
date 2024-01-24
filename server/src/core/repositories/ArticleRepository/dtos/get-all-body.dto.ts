export class GetAllBodyDto {
  constructor(readonly options?: GetAmountItem) {}
}

export class GetAmountItem {
  constructor(
    readonly interval: number,
    readonly pages: number,
    readonly hides: string[],
  ) {}
}
