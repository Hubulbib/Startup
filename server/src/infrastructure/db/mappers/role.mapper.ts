import { type IRoleDoc } from '../entities/role.entity'
import { RoleEntity } from '../../../core/entites/role.entity'

export class RoleMapper {
  public static toDomain(entity: IRoleDoc): RoleEntity {
    return new RoleEntity(entity._id, entity.name, entity.permissions)
  }
}
