import { TagEntity } from '../../entites/tag.entity'
import { EditBodyDto } from './dtos/edit-body.dto'
import { CreateBodyDto } from './dtos/create-body.dto'

export interface TagRepository {
  createOne(createBody: CreateBodyDto): Promise<TagEntity>
  getAll(): Promise<TagEntity[]>
  editOne(tagName: string, editBody: EditBodyDto): Promise<TagEntity>
  removeOne(tagName: string): Promise<void>
}
