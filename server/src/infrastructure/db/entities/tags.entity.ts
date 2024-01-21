import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: [String],
})

export const Subscribe = model('Subscribe', schema)
