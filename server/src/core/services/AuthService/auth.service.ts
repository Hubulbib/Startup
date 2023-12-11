import { AuthRepository } from '../../repositories/AuthRepository/auth.repository.js'
import { CreateBodyDto } from '../../repositories/AuthRepository/dtos/create-body.dto.js'

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async createOne(createBody: CreateBodyDto) {
    return await this.authRepository.createOne(createBody)
  }

  async auth(email: string, password: string) {
    return await this.authRepository.auth(email, password)
  }
}
