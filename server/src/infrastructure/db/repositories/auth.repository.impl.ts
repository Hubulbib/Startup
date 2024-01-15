import { compare, hash } from 'bcrypt'
import 'dotenv/config.js'
import { UserMapper } from '../mappers/user.mapper.js'
import { IUserDoc, User } from '../entities/user.entity'
import { TokenRepositoryImpl } from './TokenReposiory/token.repository.impl'
import { AuthRepository } from '../../../core/repositories/AuthRepository/auth.repository.js'
import { AuthBackDto } from '../../../core/repositories/AuthRepository/dtos/auth-back.dto'
import { SignInDto } from '../../../core/repositories/AuthRepository/dtos/sign-in.dto'
import { SignUpDto } from '../../../core/repositories/AuthRepository/dtos/sign-up.dto'
import { RefreshDto } from '../../../core/repositories/AuthRepository/dtos/refresh.dto'
import { DetailDto } from '../../../core/repositories/AuthRepository/dtos/detail.dto'
import { Role } from '../entities/role.entity'

export class AuthRepositoryImpl implements AuthRepository {
  private readonly userRepository = User
  private readonly roleRepository = Role

  public signIn = async (signInDto: SignInDto, detail: DetailDto): Promise<AuthBackDto> => {
    const user = await this.userRepository.findOne({ email: signInDto.email })
    if (!user) {
      throw Error('Пользователь не найден')
      //throw ApiError.BadRequest('Пользователь с таким username не найден')
    }
    const comparePassword = await compare(signInDto.password, user.password)
    if (!comparePassword) {
      throw Error('Неверные данные при входе')
      //throw ApiError.BadRequest('Неверные данные при входе')
    }
    return await this.responseData(user, detail.ua, detail.ip)
  }
  public signUp = async (signUpDto: SignUpDto, detail: DetailDto): Promise<AuthBackDto> => {
    const candidate = await this.userRepository.findOne({ email: signUpDto.email })
    if (candidate) {
      throw Error('Пользователь уже существует')
      //throw ApiError.BadRequest('Пользователь с таким username уже существует')
    }
    const hashedPassword = await hash(signUpDto.password, 4)
    const user = await this.userRepository.create({ ...signUpDto, password: hashedPassword })

    return await this.responseData(user, detail.ua, detail.ip)
  }
  public logout = async (refreshToken: string): Promise<void> => {
    return await new TokenRepositoryImpl().removeToken(refreshToken)
  }

  public refresh = async (refreshDto: RefreshDto, detail: DetailDto): Promise<AuthBackDto> => {
    if (!refreshDto.refreshToken) {
      throw 'Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }
    
    const userData = new TokenRepositoryImpl().validateRefreshToken(refreshDto.refreshToken)
    const tokenFromDB = await new TokenRepositoryImpl().findToken(refreshDto.refreshToken)
    if (!userData || !tokenFromDB) {
      throw 'Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }
    const user = await this.userRepository.findById(userData['_doc']._id)

    return await this.responseData(user, detail.ua, detail.ip)
  }

  private responseData = async (userData: IUserDoc, ua: string, ip: string): Promise<AuthBackDto> => {
    const tokens = new TokenRepositoryImpl().generateTokens({ ...userData })
    await new TokenRepositoryImpl().saveToken({ userId: userData._id, refreshToken: tokens.refreshToken, ua, ip })
    const user = { ...userData, roleDoc: await this.roleRepository.findOne({ name: userData.role }) }
    return {
      ...tokens,
      user: UserMapper.toDomain({ ...user['_doc'], roleDoc: user.roleDoc }),
    }
  }
}
