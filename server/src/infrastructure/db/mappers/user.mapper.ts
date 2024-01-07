import { IUserDoc, User } from '../entities/user.entity.js'
import { UserEntity, UserForListEntity } from '../../../core/entites/user.entity.js'
import { IUserToDomain } from './interfaces/user-to-domain.interface'

export class UserMapper {
  public static toDomain(entity: IUserToDomain): UserEntity {
    return new UserEntity(
      entity._id,
      entity.name,
      entity.surname,
      entity.email,
      entity.roleDoc,
      entity.rating,
      entity.avatar,
      entity.userSubscribes,
      entity.articles,
    )
  }

  public static toDomainForList(entity: IUserToDomain): UserForListEntity {
    return new UserForListEntity(entity._id, entity.name, entity.surname, entity.rating, entity.avatar)
  }

  public static toEntity(domain: UserEntity): IUserDoc {
    return new User({ ...domain })
  }
}
