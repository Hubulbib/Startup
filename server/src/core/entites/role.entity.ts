export class RoleEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly permissions: string[],
  ) {}
}
