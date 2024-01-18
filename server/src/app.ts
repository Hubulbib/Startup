import express from 'express'
import { dbConnect } from './infrastructure/db'
import 'dotenv/config.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './infrastructure/routers/userRouter/user.router'
import articleRouter from './infrastructure/routers/articleRouter/article.router'
import authRouter from './infrastructure/routers/authRouter/auth.router'
import subscribeRouter from './infrastructure/routers/subscribeRouter/subscribe.router'
import roleRouter from './infrastructure/routers/roleRouter/role.router'

const app = express()
const PORT = process.env.PORT

// dbs
dbConnect();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080',
  }),
)

// http://localhost:3000

// API
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/subscribe', subscribeRouter)
app.use('/api/auth', authRouter)
app.use('/api/role', roleRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

