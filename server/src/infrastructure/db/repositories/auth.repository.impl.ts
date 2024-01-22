import { compare, hash } from 'bcrypt'
import 'dotenv/config.js'
import { UserMapper } from '../mappers/user.mapper.js'
import { type User, userModel } from '../entities/user.entity'
import { SessionRepositoryImpl } from './TokenReposiory/session.repository.impl.js'
import { type AuthRepository } from '../../../core/repositories/AuthRepository/auth.repository.js'
import { type AuthBackDto } from '../../../core/repositories/AuthRepository/dtos/auth-back.dto'
import { type SignInDto } from '../../../core/repositories/AuthRepository/dtos/sign-in.dto'
import { type SignUpDto } from '../../../core/repositories/AuthRepository/dtos/sign-up.dto'
import { type RefreshDto } from '../../../core/repositories/AuthRepository/dtos/refresh.dto'
import { type DetailDto } from '../../../core/repositories/AuthRepository/dtos/detail.dto'
import { Role } from '../entities/role.entity'
import { genUuid } from '../../utils/generate.js'

export class AuthRepositoryImpl implements AuthRepository {
  // TODO: refactoring by constructor
  private readonly userRepository = userModel
  private readonly roleRepository = Role
  private readonly sessionRepository = new SessionRepositoryImpl()

  public signUp = async (signUpDto: SignUpDto, detail: DetailDto): Promise<AuthBackDto> => {
    const candidate = await this.userRepository.findOne({ email: signUpDto.email })
    if (candidate) {
      throw Error('Пользователь уже существует')
      // throw ApiError.BadRequest('Пользователь с таким username уже существует')
    }
    const device = {
      ...detail,
      uuid: genUuid(),
    }
    const hashedPassword = await hash(signUpDto.password, 4)
    const user = await this.userRepository.create({
      ...signUpDto,
      uuid: genUuid(),
      password: hashedPassword,
      devices: [device],
    })

    return await this.responseData(user, device.uuid)
  }

  public signIn = async (signInDto: SignInDto, detail: DetailDto): Promise<AuthBackDto> => {
    const user = await this.userRepository.findOne({ email: signInDto.email })
    if (!user) {
      throw Error('Пользователь не найден')
      // throw ApiError.BadRequest('Пользователь с таким username не найден')
    }
    const comparePassword = await compare(signInDto.password, user.password)
    if (!comparePassword) {
      throw Error('Неверные данные при входе')
      // throw ApiError.BadRequest('Неверные данные при входе')
    }
    const device = user.devices.find((e) => e.ua === detail.ua && e.ip === detail.ip)

    console.log('device >', device)

    if (!device) {
      // create device for user
      const uuidDevice = genUuid()
      await this.userRepository.updateOne(
        {
          uuid: user.uuid,
        },
        {
          $push: {
            devices: {
              ...detail,
              uuid: uuidDevice,
            },
          },
        },
      )

      return await this.responseData(user, uuidDevice)
    }

    console.log('user.uuid >', user.uuid)

    const session = await this.sessionRepository.findSessionByIds({ uuidDevice: device.uuid, uuidUser: user.uuid })
    const userWithRole = { ...user, roleDoc: await this.roleRepository.findOne({ name: user.role }) }

    console.log('session >', session) // после /logout -> null

    return {
      refreshToken: session.refreshToken.token,
      accessToken: session.accessToken.token,
      // TODO: fix _doc
      // @ts-expect-error
      user: UserMapper.toDomain({ ...userWithRole._doc, roleDoc: userWithRole.roleDoc }),
    }
  }

  public logout = async (refreshToken: string): Promise<void> => {
    const session = await this.sessionRepository.findSessionByRefresh(refreshToken)
    if (!session) {
      throw new Error('logout.session.notFound')
    }
    const user = await this.userRepository.findOne({ uuid: session.ids.uuidUser })
    if (!user) {
      throw new Error('logout.user.notFound')
    }
    await this.userRepository.updateOne(
      {
        uuid: user.uuid,
      },
      {
        $set: { devices: user.devices.filter((e) => e.uuid !== session.ids.uuidDevice) },
      },
    )
    await this.sessionRepository.removeSessionByRefresh(refreshToken)
  }

  public refresh = async (refreshDto: RefreshDto, detail: DetailDto): Promise<AuthBackDto> => {
    if (!refreshDto.refreshToken) {
      throw 'Пользователь не авторизован'
      // throw ApiError.UnauthorizedError()
    }
    const userData = this.sessionRepository.validateRefreshToken(refreshDto.refreshToken)
    const session = await this.sessionRepository.findSessionByRefresh(refreshDto.refreshToken)
    if (!userData || !session) {
      throw 'userdata || db Пользователь не авторизован'
      // throw ApiError.UnauthorizedError()
    }
    const user = await this.userRepository.findOne({ uuid: session.ids.uuidUser })
    const device = user.devices.find((e) => e.ua === detail.ua && e.ip === detail.ip)
    // remove session for creating new
    await this.sessionRepository.removeSessionByRefresh(refreshDto.refreshToken)

    return await this.responseData(user, device.uuid)
  }

  private readonly responseData = async (userData: User, uuidDevice: string): Promise<AuthBackDto> => {
    const tokens = this.sessionRepository.generateTokens({ ...userData })
    await this.sessionRepository.saveToken({ uuidUser: userData.uuid, tokens, uuidDevice })
    const user = { ...userData, roleDoc: await this.roleRepository.findOne({ name: userData.role }) }
    return {
      ...tokens,
      // TODO: fix _doc
      // @ts-expect-error
      user: UserMapper.toDomain({ ...user._doc, roleDoc: user.roleDoc }),
    }
  }
}
