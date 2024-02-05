import { type RoleEntity } from './role.entity'

export class UserEntity {
  constructor(
    readonly id: string,
    readonly uuid: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly role: RoleEntity,
    readonly rating: number,
    readonly avatar: string,
    readonly messages?: { [key: string]: string }[],
    readonly defaultMessages?: { [key: string]: string }[],
    readonly userSubscribes?: string[],
    readonly articles?: string[],
    readonly likes?: string[],
    readonly hides?: string[],
  ) {}
}

export class UserForListEntity {
  constructor(
    readonly _id: string,
    readonly uuid: string,
    readonly name: string,
    readonly surname: string,
    readonly rating: number,
    readonly avatar: string,
  ) {}
}
