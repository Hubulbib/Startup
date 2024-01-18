import { User } from '../../entities/user.entity'
import { RoleEntity } from '../../../../core/entites/role.entity'

export interface IUserToDomain extends User {
  roleDoc?: RoleEntity
  userSubscribes?: string[]
  articles?: string[]
}
