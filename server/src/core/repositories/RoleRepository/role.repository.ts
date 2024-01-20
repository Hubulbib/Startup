import { type RoleEntity } from '../../entites/role.entity'
import { type EditBodyDto } from './dtos/edit-body.dto'
import { type CreateBodyDto } from './dtos/create-body.dto'

export interface RoleRepository {
  getAll: () => Promise<RoleEntity[]>
  getByName: (name: string) => Promise<RoleEntity>
  createOne: (createBody: CreateBodyDto) => Promise<RoleEntity>
  editOne: (name: string, editBody: EditBodyDto) => Promise<void>
  removeOne: (name: string) => Promise<void>
}
