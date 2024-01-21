import { tsUnix } from '../../utils/date.js'
import { EUserRole } from './enums/user-role.enum.js'
import { PropType, Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

// export type IUserDoc = Document<any, any, IUser> & IUser

// const schema = new Schema<IUser>({
//   uuid: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   surname: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   }, //замена имени при логине
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     default: UserRoleEnum.user,
//     enum: Object.values(UserRoleEnum),
//   },
//   rating: [Number], // на фронт отправляем среднее
//   //добавить средний рейтинг
//   avatar: String, //gridFS или по ключу с облака //дефолтная функция кешируется????

//   // sessions: [{
//   //     после чата
//   // }],

//   // вынести отдельно в коллекцию

//   // defaultMessage: {
//   //     type: String,
//   //     default: ''
//   //     //roleMiddleware(['mentor'])
//   // }
// })

// export const User = model('User', schema)
export class BaseDates {
  @prop({ type: Number, default: () => tsUnix() })
  created: number

  @prop({ type: Number, default: () => tsUnix() })
  updated: number
}

class UserDevice {
  @prop({ type: String, required: true })
  uuid: string

  @prop({ type: String, required: true })
  ua: string

  @prop({ type: String, required: true })
  ip: string
}
@modelOptions({
  schemaOptions: { collection: 'user' },
  options: {
    customName: 'user',
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ type: String, required: true })
  uuid: string

  @prop({ type: String, required: true })
  name: string

  @prop({ type: String, required: true })
  surname: string

  @prop({ type: String, required: true, unique: true })
  email: string

  @prop({ type: String, required: true })
  password: string

  @prop({ enum: EUserRole, type: String, default: () => EUserRole.user })
  role?: EUserRole

  @prop({ type: Number, default: [] }, PropType.ARRAY)
  rating?: number[]

  @prop({ type: String })
  avatar?: string
  
  @prop({ type: () => UserDevice, default: [] }, PropType.ARRAY)
  devices: UserDevice[]

  @prop({ type: () => BaseDates, default: {}, required: true, _id: false })
  dates: BaseDates
}

export const userModel = getModelForClass(User, {
  options: { allowMixed: Severity.ALLOW },
})
