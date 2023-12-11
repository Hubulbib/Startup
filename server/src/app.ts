import express from 'express'
import { dbConnect } from './infrastructure/db'
import 'dotenv/config.js'

import userRouter from './infrastructure/routers/user.router.js'
import articleRouter from './infrastructure/routers/article.router'
import authRouter from './infrastructure/routers/auth.router'
import subscribeRouter from './infrastructure/routers/subscribe.router'

import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

/*app.use('/api/user', [AuthMiddleware], userRouter)
app.use('/api/article', [AuthMiddleware], articleRouter)
app.use('/api/subscribe', [AuthMiddleware], subscribeRouter)*/
// Подумаем с миддлваре

app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/subscribe', subscribeRouter)
app.use('/api/auth', authRouter)

await dbConnect().then(() => app.listen(PORT, () => console.log(`Server has been started on ${PORT}`)))
