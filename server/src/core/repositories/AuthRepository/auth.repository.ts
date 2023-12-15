import { UserEntity } from '../../entites/user.entity.js'
import { CreateBodyDto } from './dtos/create-body.dto.js'
import { AuthBackDto } from './dtos/auth-back.dto'

export interface AuthRepository {
  createOne(createBody: CreateBodyDto): Promise<UserEntity>
  auth(email: string, password: string): Promise<AuthBackDto>
  // private generateAccessToken(userId: string, role: string): string
}
