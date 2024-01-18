import jwt from 'jsonwebtoken'
import { Session, sessionModel } from '../../entities/token.entity'
import { TokenRepository } from './interfaces/token.interface'
import { SaveTokenDto } from './dtos/save-token.dto'
import { GenerateTokensResult } from './dtos/generate-tokens-result.dto'
import 'dotenv/config.js'
import { genUuid } from '../../../utils/generate'
import { tsUnix } from '../../../utils/date'

export class TokenRepositoryImpl implements TokenRepository {
  private readonly session = sessionModel

  private readonly SECRET_ACCESS_JWT = process.env.SECRET_ACCESS_JWT
  private readonly SECRET_REFRESH_JWT = process.env.SECRET_REFRESH_JWT
  private readonly EXPIRES_IN_ACCESS = process.env.EXPIRES_IN_ACCESS
  private readonly EXPIRES_IN_REFRESH = process.env.EXPIRES_IN_REFRESH
  private readonly MAX_AGE_TOKEN = +process.env.MAX_AGE_TOKEN

  public generateTokens = (payload: object) => {
    const accessToken = jwt.sign(payload, this.SECRET_ACCESS_JWT, { expiresIn: this.EXPIRES_IN_ACCESS })
    const refreshToken = jwt.sign(payload, this.SECRET_REFRESH_JWT, { expiresIn: this.EXPIRES_IN_REFRESH })
    return new GenerateTokensResult(accessToken, refreshToken)
  }

  public validateAccessToken = (token: string) => {
    try {
      return jwt.verify(token, this.SECRET_ACCESS_JWT)
    } catch (err) {
      return null
    }
  }

  public validateRefreshToken = (token: string) => {
    try {
      return jwt.verify(token, this.SECRET_REFRESH_JWT)
    } catch (err) {
      return null
    }
  }

  public saveToken = async (saveTokenDto: SaveTokenDto) => {
    const expire = Math.round((Date.now() + this.MAX_AGE_TOKEN) / 1000)

    // const tokenData = await this.session.find({ userId: saveTokenDto.userId }, null, { sort: { createdAt: 1 } })

    // if (tokenData.length == 5) {
    //   tokenData[4].refreshToken = saveTokenDto.refreshToken
    //   tokenData[4].ua = saveTokenDto.ua
    //   tokenData[4].ip = saveTokenDto.ip
    //   tokenData[4].expiresIn = EXPIRES_IN
    //   tokenData[4].createdAt = new Date()

    //   tokenData.map((el) => {
    //     this.removeToken(el.refreshToken)
    //   })

    //   await tokenData[4].save()
    //   return
    // }
    const sessionData: Session = {
      uuid: genUuid(),
      ids: {
        // TODO: from user device
        uuidDevice: `${saveTokenDto.uuidDevice}`,
        uuidUser: `${saveTokenDto.uuidUser}`
      },
      refreshToken: {token: saveTokenDto.tokens.refreshToken, expire,},
      accessToken: {token: saveTokenDto.tokens.accessToken, expire,},
      dates: {
        created: tsUnix(),
        updated: tsUnix()
      }
    }

    await this.session.create(sessionData)
  }

  public removeToken = async (refreshToken: string) => {
    await this.session.deleteOne({ "refreshToken.token": refreshToken })
  }

  public findToken = async (refreshToken: string) => {
    return this.session.findOne({ "refreshToken.token": refreshToken })
  }

  public findTokensByIds = async (ids: {uuidUser: string, uuidDevice: string}) => {
    return this.session.findOne({ ids })
  }
}
