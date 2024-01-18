import { Document, model, Schema } from 'mongoose'
import { IToken } from './interfaces/token.interface'
import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose'
import { tsUnix } from '../../utils/date'

// export type TokenDoc = Document<any, any, IToken> & IToken

// const schema = new Schema<IToken>({
//   userId: { type: Schema.Types.ObjectId, required: true },
//   refreshToken: { type: String, required: true },
//   // TODO: move device info to user
//   ua: { type: String, required: true },
//   ip: { type: String, required: true },
//   expiresIn: { type: Number, required: true },
//   createdAt: { type: Date, required: true },
// })

// export const Token = model<IToken>('Token', schema)

// TODO: shared
export class BaseDates {
	@prop({ type: Number, default: () => tsUnix() })
	created: number;
	@prop({ type: Number, default: () => tsUnix() })
	updated: number;
}
class SessionIds {
  @prop({ type: String, required: true })
  uuidUser: string;
  @prop({ type: String, required: true })
  uuidDevice: string;
}

class SessionRefreshToken {
  @prop({ type: String, required: true })
  token: string;
  @prop({ type: Number, required: true })
  expire: number;
}
@modelOptions({
  schemaOptions: { collection: "session" },
  options: {
    customName: "session",
    allowMixed: Severity.ALLOW,
  },
})
export class Session {
  @prop({ type: String, required: true })
  uuid: string;
  @prop({ type: () => SessionIds, default: {}, required: true, _id: false })
  ids: SessionIds;
  @prop({ type: () => SessionRefreshToken, default: {}, required: true, _id: false })
  refreshToken: SessionRefreshToken;
  @prop({ type: () => BaseDates, default: {}, required: true, _id: false })
  dates: BaseDates
}

export const sessionModel = getModelForClass(Session, {
  options: { allowMixed: Severity.ALLOW },
});