import { type UserRepository } from '../../repositories/UserRepository/user.repository'
import { type EditBodyDto } from '../../repositories/UserRepository/dtos/edit-body.dto'
import { type GetAllBodyDto } from '../../repositories/UserRepository/dtos/get-all-body.dto'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getAll = async (getAllBody: GetAllBodyDto) => {
    return await this.userRepository.getAll(getAllBody)
  }

  getAllForList = async (getAllBody: GetAllBodyDto) => {
    return await this.userRepository.getAllForList(getAllBody)
  }

  getOneById = async (userId: string) => {
    return await this.userRepository.getOneById(userId)
  }

  editOne = async (userId: string, editBody: EditBodyDto) => {
    return await this.userRepository.editOne(userId, editBody)
  }

  removeOne = async (userId: string) => {
    return await this.userRepository.removeOne(userId)
  }
}
