import express from 'express'
import { dbConnect } from './infrastructure/db'
import 'dotenv/config.js'

import userRouter from './infrastructure/routers/userRouter/user.router'
import articleRouter from './infrastructure/routers/articleRouter/article.router'
import authRouter from './infrastructure/routers/authRouter/auth.router'
import subscribeRouter from './infrastructure/routers/subscribeRouter/subscribe.router'
import roleRouter from './infrastructure/routers/roleRouter/role.router'

import cors from 'cors'

//import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
)

/*app.use('/api/user', [AuthMiddleware], userRouter)
app.use('/api/article', [AuthMiddleware], articleRouter)
app.use('/api/subscribe', [AuthMiddleware], subscribeRouter)*/
// Подумаем с миддлваре

// http://localhost:3000

app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/subscribe', subscribeRouter)
app.use('/api/auth', authRouter)
app.use('/api/role', roleRouter)

await dbConnect().then(() => app.listen(PORT, () => console.log(`Server has been started on ${PORT}`)))
