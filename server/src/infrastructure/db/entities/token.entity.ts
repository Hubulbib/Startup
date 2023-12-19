import { Document, model, Schema } from 'mongoose'
import { IToken } from './interfaces/token.interface'

export type TokenDoc = Document<any, any, IToken> & IToken

const schema = new Schema<IToken>({
  userId: { type: Schema.Types.ObjectId, required: true },
  refreshToken: { type: String, required: true },
  ua: { type: String, required: true },
  ip: { type: String, required: true },
  expiresIn: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const Token = model<IToken>('Token', schema)
