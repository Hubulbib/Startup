import { compare, hash } from 'bcrypt'
import 'dotenv/config.js'
import { UserMapper } from '../mappers/user.mapper.js'
import { User, userModel } from '../entities/user.entity'
import { TokenRepositoryImpl } from './TokenReposiory/token.repository.impl'
import { AuthRepository } from '../../../core/repositories/AuthRepository/auth.repository.js'
import { AuthBackDto } from '../../../core/repositories/AuthRepository/dtos/auth-back.dto'
import { SignInDto } from '../../../core/repositories/AuthRepository/dtos/sign-in.dto'
import { SignUpDto } from '../../../core/repositories/AuthRepository/dtos/sign-up.dto'
import { RefreshDto } from '../../../core/repositories/AuthRepository/dtos/refresh.dto'
import { DetailDto } from '../../../core/repositories/AuthRepository/dtos/detail.dto'
import { Role } from '../entities/role.entity'
import { genUuid } from '../../utils/generate.js'

export class AuthRepositoryImpl implements AuthRepository {
  private readonly userRepository = userModel
  private readonly roleRepository = Role

  public signUp = async (signUpDto: SignUpDto, detail: DetailDto): Promise<AuthBackDto> => {
    const candidate = await this.userRepository.findOne({ email: signUpDto.email })
    if (candidate) {
      throw Error('Пользователь уже существует')
      //throw ApiError.BadRequest('Пользователь с таким username уже существует')
    }
    const device = {
      ...detail,
      uuid: genUuid()
    }
    const hashedPassword = await hash(signUpDto.password, 4)
    const user = await this.userRepository.create({ ...signUpDto, uuid: genUuid(), password: hashedPassword, devices: [device] })

    return await this.responseData(user, device.uuid)
  }

  // TODO: tmp: any
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
    const device = user.devices.find(e => e.ua === detail.ua && e.ip === detail.ip)

    if (!device) {
      const uuidDevice = genUuid();
      await this.userRepository.updateOne(
        {
          uuid: user.uuid,
        },
        { $push: { devices: {
          ...detail,
          uuid: uuidDevice,
        } } },
      );
      return this.responseData(user, uuidDevice)  
    }
    // TODO: new is bad!!!!!!
    const session = await new TokenRepositoryImpl().findTokensByIds({uuidDevice: device.uuid, uuidUser: user.uuid})
    console.log(session)
    const userWithRole = { ...user, roleDoc: await this.roleRepository.findOne({ name: user.role }) }
    return {
      refreshToken: session.refreshToken.token,
      accessToken: session.accessToken.token,
      user: UserMapper.toDomain({ ...userWithRole['_doc'], roleDoc: userWithRole.roleDoc }),
    }
  }



  public logout = async (refreshToken: string): Promise<void> => {
    return await new TokenRepositoryImpl().removeToken(refreshToken)
  }

  // TODO: tmp any
  public refresh = async (refreshDto: RefreshDto, detail: DetailDto): Promise<any> => {
    if (!refreshDto.refreshToken) {
      throw 'Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }

    const userData = new TokenRepositoryImpl().validateRefreshToken(refreshDto.refreshToken)
    const tokenFromDB = await new TokenRepositoryImpl().findToken(refreshDto.refreshToken)
    if (!userData || !tokenFromDB) {
      throw 'userdata || db Пользователь не авторизован'
      //throw ApiError.UnauthorizedError()
    }
    const user = await this.userRepository.findById(userData['_doc']._id)

    // TODO: logic for creting new acces by refresh
    //return await this.responseData(user, uuidDevice)
  }

  private responseData = async (userData: User, uuidDevice: string): Promise<AuthBackDto> => {
     // TODO: new is bad!!!!!!
    const tokens = new TokenRepositoryImpl().generateTokens({ ...userData })
     // TODO: new is bad!!!!!!
    await new TokenRepositoryImpl().saveToken({ uuidUser: userData.uuid, tokens, uuidDevice })
    const user = { ...userData, roleDoc: await this.roleRepository.findOne({ name: userData.role }) }
    return {
      ...tokens,
      user: UserMapper.toDomain({ ...user['_doc'], roleDoc: user.roleDoc }),
    }
  }
}
