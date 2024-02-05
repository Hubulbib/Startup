import { type User, userModel } from '../entities/user.entity.js'
import { UserEntity, UserForListEntity } from '../../../core/entites/user.entity.js'
import { type IUserToDomain } from './interfaces/user-to-domain.interface'

export class UserMapper {
  public static toDomain(entity: IUserToDomain): UserEntity {
    return new UserEntity(
      // TODO: remove id
      // @ts-expect-error
      entity._id,
      entity.uuid,
      entity.name,
      entity.surname,
      entity.email,
      entity.roleDoc,
      entity.rating.reduce((acc, el) => acc + el, 0) / entity.rating.length,
      entity.avatar,
      entity.messages,
      entity.defaultMessages,
      entity.userSubscribes,
      entity.articles,
      entity.likes,
      entity.hides,
    )
  }

  public static toDomainForList(entity: IUserToDomain): UserForListEntity {
    return new UserForListEntity(
      // TODO: remove id
      // @ts-expect-error
      entity._id,
      entity.uuid,
      entity.name,
      entity.surname,
      entity.rating.reduce((acc, el) => acc + el, 0) / entity.rating.length,
      entity.avatar,
    )
  }

  // TODO: tmp any
  public static toEntity(domain: User): User {
    return new userModel({ ...domain })
  }
}
