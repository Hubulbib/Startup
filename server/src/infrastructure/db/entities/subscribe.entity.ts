import { Document, model, Schema } from 'mongoose'
import { ISubscribe } from './interfaces/subscribe.interface'

export type ISubscribeDoc = Document<any, any, ISubscribe> & ISubscribe

const schema = new Schema<ISubscribe>({
  userId: { type: String, required: true },
  articleId: { type: String, required: true },
  price: { type: Number }, //за проверку работы по этой статье
  message: { type: String }, //если нет, то реф на дефолт мсг от ментора
})

export const Subscribe = model('Subscribe', schema)
