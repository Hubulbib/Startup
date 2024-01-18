import { ObjectId } from 'mongoose';
import { RoleEntity } from './role.entity'

export class UserEntity {
  constructor(
    readonly uuid: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly role: RoleEntity,
    readonly rating: number,
    readonly avatar: string,
    readonly userSubscribes?: string[],
    readonly articles?: string[],
  ) {}
}

export class UserForListEntity {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly surname: string,
    readonly rating: number,
    readonly avatar: string,
  ) {}
}
