import { DetailDto } from './dtos/detail.dto'
import { AuthBackDto } from './dtos/auth-back.dto'
import { SignInDto } from './dtos/sign-in.dto'
import { SignUpDto } from './dtos/sign-up.dto'
import { RefreshDto } from './dtos/refresh.dto'

export interface AuthRepository {
  signIn(signInDto: SignInDto, detail: DetailDto): Promise<AuthBackDto>
  signUp(signUpDto: SignUpDto, detail: DetailDto): Promise<AuthBackDto>
  logout(refreshToken: string): Promise<void>
  refresh(refreshDto: RefreshDto, detail: DetailDto): Promise<AuthBackDto>
}
