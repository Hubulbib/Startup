import { IAuthRequest } from '../../interfaces/auth-request.interface'
import { NextFunction, Response } from 'express'
import { UserRoleEnum } from '../../db/entities/enums/user-role.enum'

export class RoleMiddleware {
  public static UserRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user.role !== UserRoleEnum.user) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static MentorRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user.role !== UserRoleEnum.mentor) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static AdminRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user.role !== UserRoleEnum.admin) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static HeadRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user.role !== UserRoleEnum.head) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}
