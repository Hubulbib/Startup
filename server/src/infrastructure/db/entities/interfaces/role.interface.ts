import { type UserRoleEnum } from '../enums/user-role.enum'

export interface IRole {
  name: string
  permissions: UserRoleEnum[]
}
