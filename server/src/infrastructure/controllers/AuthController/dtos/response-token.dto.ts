import { AuthBackDto } from '../../../../core/repositories/AuthRepository/dtos/auth-back.dto'
import { UserEntity } from '../../../../core/entites/user.entity'

export class ResponseTokenDto {
  public user: UserEntity
  public accessToken: string

  constructor(data: AuthBackDto) {
    this.user = data.user
    this.accessToken = data.accessToken
  }
}
