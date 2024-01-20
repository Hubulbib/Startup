import { type AuthRepository } from '../../repositories/AuthRepository/auth.repository.js'
import { type SignUpDto } from '../../repositories/AuthRepository/dtos/sign-up.dto'
import { type SignInDto } from '../../repositories/AuthRepository/dtos/sign-in.dto'
import { type DetailDto } from '../../repositories/AuthRepository/dtos/detail.dto'
import { type RefreshDto } from '../../repositories/AuthRepository/dtos/refresh.dto'

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public signIn = async (signInDto: SignInDto, detail: DetailDto) => {
    return await this.authRepository.signIn(signInDto, detail)
  }

  public signUp = async (signUpDto: SignUpDto, detail: DetailDto) => {
    return await this.authRepository.signUp(signUpDto, detail)
  }

  public refresh = async (refreshDto: RefreshDto, detail: DetailDto) => {
    return await this.authRepository.refresh(refreshDto, detail)
  }

  public logout = async (refreshToken: string) => {
    await this.authRepository.logout(refreshToken)
  }
}
