import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface IAuthRequest extends Request, JwtPayload {
  user: IAuthUser
}

export interface IAuthUser {
  userId: string
  role?: string
  details: {
    ua: string
    ip: string
  }
}