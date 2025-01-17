import { type UserEntity } from '../../../entites/user.entity'

export class AuthBackDto {
  constructor(
    readonly user: UserEntity,
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {}
}
