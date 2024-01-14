import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const JWT_SECRET = process.env.SECRET_ACCESS_JWT
    if (!req.headers.authorization) return res.status(401).end()

    const accessToken = req.headers?.authorization.split(' ')[1]

    if (!accessToken) {
      return res.status(401).end()
    }

    const userData = jwt.verify(accessToken, JWT_SECRET)

    if (!userData || typeof userData === 'string') {
      return res.status(400).end()
    }

    req['user'] = {
      ...userData,
      details: {
        ua: req.get('User-Agent'),
        ip: req.ip,
      },
    }

    next()
  } catch (err) {
    return res.status(500).json(err)
  }
}
