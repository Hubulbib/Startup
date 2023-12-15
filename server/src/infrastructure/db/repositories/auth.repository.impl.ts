import { model } from 'mongoose'
import jwt from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { AuthRepository } from '../../../core/repositories/AuthRepository/auth.repository.js'
import { UserEntity } from '../../../core/entites/user.entity.js'
import { CreateBodyDto } from '../../../core/repositories/AuthRepository/dtos/create-body.dto.js'
import { UserMapper } from '../mappers/user.mapper.js'
import { AuthBackDto } from '../../../core/repositories/AuthRepository/dtos/auth-back.dto'
import { IUserDoc } from '../entities/user.entity'
import 'dotenv/config.js'

export class AuthRepositoryImpl implements AuthRepository {
  private readonly userRepository = model('User')

  async createOne(createBody: CreateBodyDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne({ email: createBody.email })
    if (candidate) {
      throw new Error('Пользователь с таким e-mail уже зарегистрирован')
    }

    const userPassword = await hash(createBody.password, 7)
    return UserMapper.toDomain(await this.userRepository.create({ ...createBody, password: userPassword }))
  }

  async auth(email: string, password: string): Promise<AuthBackDto> {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      throw Error('Пользователь с таким e-mail не найден')
    }

    if (!(await compare(password, user.password))) {
      throw Error('Неверный пароль')
    }

    return this.generateAccessToken(user)
  }

  private generateAccessToken(user: IUserDoc): AuthBackDto {
    const payload = { userId: user._id, role: user.role }
    const JWT_SECRET = process.env.JWT_SECRET
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
    return {
      user: UserMapper.toDomain(user),
      accessToken,
    }
  }
}
