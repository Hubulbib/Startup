import { connect } from 'mongoose'
import 'dotenv/config.js'

const MONGO_URL = process.env.MONGO_URL

export const dbConnect = async () => {
  await connect(MONGO_URL).then(() => console.log('Database has started'))
}
