import { type IAuthRequest } from '../../interfaces/auth-request.interface'
import { type NextFunction, type Response } from 'express'
import { EUserRole } from '../../db/entities/enums/user-role.enum'

export class RoleMiddleware {
  public static UserRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // TODO: fix _doc
      // @ts-expect-error
      if (req.user._doc.role !== EUserRole.user) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static MentorRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // TODO: fix _doc
      // @ts-expect-error
      if (req.user._doc.role !== EUserRole.mentor) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static AdminRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // TODO: fix _doc
      // @ts-expect-error
      if (req.user._doc.role !== EUserRole.admin) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  public static HeadRole = (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // TODO: fix _doc
      // @ts-expect-error
      if (req.user._doc.role !== EUserRole.head) {
        return res.status(403).end()
      }
      next()
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}
