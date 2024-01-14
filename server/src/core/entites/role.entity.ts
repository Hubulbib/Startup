export class RoleEntity {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly permissions: string[],
  ) {}
}
