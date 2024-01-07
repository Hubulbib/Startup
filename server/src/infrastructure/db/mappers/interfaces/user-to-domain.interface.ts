import { IUserDoc } from '../../entities/user.entity'
import { RoleEntity } from '../../../../core/entites/role.entity'

export interface IUserToDomain extends IUserDoc {
  roleDoc?: RoleEntity
  userSubscribes?: string[]
  articles?: string[]
}
