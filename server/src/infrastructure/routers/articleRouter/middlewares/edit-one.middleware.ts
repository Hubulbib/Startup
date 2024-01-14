import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import { NextFunction, Response } from 'express'
import { RoleMiddleware } from '../../../middlewares/RoleMiddleware/role.middleware'
import { IAuthRequest } from '../../../controllers/interfaces/auth-request.interface'
import { UserRoleEnum } from '../../../db/entities/enums/user-role.enum'
import { AdminReqBodyDto } from './dtos/admin.req-body.dto'
import { MentorReqBodyDto } from './dtos/mentor.req-body.dto'
import { UserReqBodyDto } from './dtos/user.req-body.dto'

export const EditOneMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const JWT_SECRET = process.env.SECRET_ACCESS_JWT
    if (!req.headers.authorization) return res.status(401)
    const accessToken = req.headers?.authorization.split(' ')[1]
    if (!accessToken) {
      return res.status(401)
    }
    const userData = jwt.verify(accessToken, JWT_SECRET)
    if (userData && typeof userData !== 'string') {
      req['user'] = {
        userId: userData['_doc']._id,
        role: userData['_doc'].role,
        details: {
          ua: req.get('User-Agent'),
          ip: req.ip,
        },
      }
      if (req['user'].role === UserRoleEnum.admin) {
        req.body = new AdminReqBodyDto(req.body)
        return RoleMiddleware.AdminRole(req, res, next)
      } else if (req['user'].role === UserRoleEnum.mentor) {
        req.body = new MentorReqBodyDto(req.body)
        return RoleMiddleware.MentorRole(req, res, next)
      } else if (req['user'].role === UserRoleEnum.user) {
        req.body = new UserReqBodyDto(req.body)
        return RoleMiddleware.UserRole(req, res, next)
      } else res.status(403).end()
    }
    next()
  } catch (err) {
    return res.status(500).json(err)
  }
}
