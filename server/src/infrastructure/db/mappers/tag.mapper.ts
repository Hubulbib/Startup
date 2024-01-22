import { Tag } from '../entities/tag.entity'
import { TagEntity } from '../../../core/entites/tag.entity'

export class TagMapper {
  public static toDomain(entity: Tag): TagEntity {
    return new TagEntity(entity.name)
  }
}
