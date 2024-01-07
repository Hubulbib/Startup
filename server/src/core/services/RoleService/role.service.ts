import { RoleRepository } from '../../repositories/RoleRepository/role.repository'
import { CreateBodyDto } from '../../repositories/RoleRepository/dtos/create-body.dto'
import { EditBodyDto } from '../../repositories/RoleRepository/dtos/edit-body.dto'

export class RoleService {
  constructor(readonly roleRepository: RoleRepository) {}

  getAll = async () => {
    return this.roleRepository.getAll()
  }

  getByName = async (name: string) => {
    return this.roleRepository.getByName(name)
  }

  createOne = async (createBody: CreateBodyDto) => {
    return this.roleRepository.createOne(createBody)
  }

  editOne = async (name: string, editBody: EditBodyDto) => {
    return this.roleRepository.editOne(name, editBody)
  }

  removeOne = async (name: string) => {
    return this.roleRepository.removeOne(name)
  }
}
