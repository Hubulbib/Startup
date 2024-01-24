import { NextFunction, Request, Response } from 'express'
import { AuthMiddleware } from './auth.middleware'

export const AuthEitherMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return AuthMiddleware(req, res, next)
  }
  next()
}
