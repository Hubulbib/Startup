import { Schema, model, Document } from 'mongoose'
import { UserRoleEnum } from './enums/user-role.enum.js'
import { IUser } from './interfaces/user.interface.js'

export type IUserDoc = Document<any, any, IUser> & IUser

const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }, //замена имени при логине
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: UserRoleEnum.user,
    enum: Object.values(UserRoleEnum),
  },
  rating: [Number], // на фронт отправляем среднее
  //добавить средний рейтинг
  avatar: String, //gridFS или по ключу с облака //дефолтная функция кешируется????

  // sessions: [{
  //     после чата
  // }],

  // вынести отдельно в коллекцию

  // defaultMessage: {
  //     type: String,
  //     default: ''
  //     //roleMiddleware(['mentor'])
  // }
})

export const User = model('User', schema)
