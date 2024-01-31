import { type UserEntity, type UserForListEntity } from '../../entites/user.entity'
import { type EditBodyDto } from './dtos/edit-body.dto'
import { type GetAllBodyDto } from './dtos/get-all-body.dto'

export interface UserRepository {
  getAll: (getAllBody: GetAllBodyDto) => Promise<UserEntity[]>
  getAllForList: (getAllBody: GetAllBodyDto) => Promise<UserForListEntity[]>
  getOneById: (userId: string) => Promise<UserEntity>
  editOne: (userId: string, editBody: EditBodyDto) => Promise<void>
  removeOne: (userId: string) => Promise<UserEntity>
}
