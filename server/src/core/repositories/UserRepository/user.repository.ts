import { UserEntity, UserForListEntity } from '../../entites/user.entity'
import { EditBodyDto } from './dtos/edit-body.dto'
import { GetAllBodyDto } from './dtos/get-all-body.dto'

export interface UserRepository {
  getAll(getAllBody: GetAllBodyDto): Promise<UserEntity[]>
  getAllForList(getAllBody: GetAllBodyDto): Promise<UserForListEntity[]>
  getOneById(userId: string): Promise<UserEntity>
  editOne(userId: string, editBody: EditBodyDto): Promise<UserEntity>
  removeOne(userId: string): Promise<UserEntity>
}