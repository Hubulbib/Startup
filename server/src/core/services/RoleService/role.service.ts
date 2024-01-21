import { type RoleRepository } from '../../repositories/RoleRepository/role.repository'
import { type CreateBodyDto } from '../../repositories/RoleRepository/dtos/create-body.dto'
import { type EditBodyDto } from '../../repositories/RoleRepository/dtos/edit-body.dto'

export class RoleService {
  constructor(readonly roleRepository: RoleRepository) {}

  getAll = async () => {
    return await this.roleRepository.getAll()
  }

  getByName = async (name: string) => {
    return await this.roleRepository.getByName(name)
  }

  createOne = async (createBody: CreateBodyDto) => {
    return await this.roleRepository.createOne(createBody)
  }

  editOne = async (name: string, editBody: EditBodyDto) => {
    await this.roleRepository.editOne(name, editBody)
  }

  removeOne = async (name: string) => {
    await this.roleRepository.removeOne(name)
  }
}
