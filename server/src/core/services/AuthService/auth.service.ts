import { AuthRepository } from '../../repositories/AuthRepository/auth.repository.js'
import { SignUpDto } from '../../repositories/AuthRepository/dtos/sign-up.dto'
import { SignInDto } from '../../repositories/AuthRepository/dtos/sign-in.dto'
import { DetailDto } from '../../repositories/AuthRepository/dtos/detail.dto'
import { RefreshDto } from '../../repositories/AuthRepository/dtos/refresh.dto'

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public signIn = (signInDto: SignInDto, detail: DetailDto) => {
    return this.authRepository.signIn(signInDto, detail)
  }

  public signUp = (signUpDto: SignUpDto, detail: DetailDto) => {
    return this.authRepository.signUp(signUpDto, detail)
  }

  public refresh = (refreshDto: RefreshDto, detail: DetailDto) => {
    return this.authRepository.refresh(refreshDto, detail)
  }

  public logout = (refreshToken: string) => {
    return this.authRepository.logout(refreshToken)
  }
}
