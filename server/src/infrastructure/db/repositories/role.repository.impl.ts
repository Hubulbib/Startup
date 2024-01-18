import { Role } from '../entities/role.entity'
import { RoleMapper } from '../mappers/role.mapper'
import { RoleEntity } from '../../../core/entites/role.entity'
import { RoleRepository } from '../../../core/repositories/RoleRepository/role.repository'
import { CreateBodyDto } from '../../../core/repositories/RoleRepository/dtos/create-body.dto'
import { EditBodyDto } from '../../../core/repositories/RoleRepository/dtos/edit-body.dto'
import { EUserRole } from '../entities/enums/user-role.enum'

export class RoleRepositoryImpl implements RoleRepository {
  private readonly roleRepository = Role
  async getAll(): Promise<RoleEntity[]> {
    return (await this.roleRepository.find()).map((el) => RoleMapper.toDomain(el))
  }

  async getByName(name: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ name })
    if (!role) {
      throw Error('Такой роли не существует')
    }
    return RoleMapper.toDomain(role)
  }

  async createOne(createBody: CreateBodyDto): Promise<RoleEntity> {
    if (await this.roleRepository.findOne({ name: createBody.name })) {
      throw Error('Такая роль уже существует')
    }
    const role = await this.roleRepository.create(createBody)
    return RoleMapper.toDomain(role)
  }

  async editOne(name: string, editBody: EditBodyDto): Promise<void> {
    const role = await this.roleRepository.findOne({ name })
    if (!role) {
      throw Error('Такой роли не существует')
    }
    role.name = editBody.name
    role.permissions = editBody.permissions.map((el) => EUserRole[el]).filter((el) => el !== undefined)
    await role.save()
  }

  async removeOne(name: string): Promise<void> {
    if (!(await this.roleRepository.findOne({ name }))) {
      throw Error('Такой роли не существует')
    }
    await this.roleRepository.deleteOne({ name })
  }
}
