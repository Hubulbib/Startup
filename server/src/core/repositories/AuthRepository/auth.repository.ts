import { UserEntity } from '../../entites/user.entity.js'
import { CreateBodyDto } from './dtos/create-body.dto.js'

export interface AuthRepository {
  createOne(createBody: CreateBodyDto): Promise<UserEntity>
  auth(email: string, password: string): Promise<string>
  // private generateAccessToken(userId: string, role: string): string
}
