import { Types } from 'mongoose'

export interface IToken {
  userId: Types.ObjectId
  refreshToken: string
  ua: string
  ip: string
  expiresIn: number
  createdAt: Date
}
