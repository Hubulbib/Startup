export class SaveTokenDto {
  constructor(
    readonly uuidUser: string,
    readonly uuidDevice: string,
    readonly refreshToken: string,
  ) {}
}
