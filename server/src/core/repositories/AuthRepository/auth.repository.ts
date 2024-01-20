import { type DetailDto } from './dtos/detail.dto'
import { type AuthBackDto } from './dtos/auth-back.dto'
import { type SignInDto } from './dtos/sign-in.dto'
import { type SignUpDto } from './dtos/sign-up.dto'
import { type RefreshDto } from './dtos/refresh.dto'

export interface AuthRepository {
  signIn: (signInDto: SignInDto, detail: DetailDto) => Promise<AuthBackDto>
  signUp: (signUpDto: SignUpDto, detail: DetailDto) => Promise<AuthBackDto>
  logout: (refreshToken: string) => Promise<void>
  refresh: (refreshDto: RefreshDto, detail: DetailDto) => Promise<AuthBackDto>
}
