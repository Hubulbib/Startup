import { TagRepository } from '../../repositories/TagRepository/tag.repository'
import { CreateBodyDto } from '../../repositories/TagRepository/dtos/create-body.dto'
import { EditBodyDto } from '../../repositories/TagRepository/dtos/edit-body.dto'

export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  getAll = async (): Promise<string[]> => {
    const tagData = await this.tagRepository.getAll()
    return tagData.map((el) => el.name)
  }

  createOne = async (createBody: CreateBodyDto) => {
    return this.tagRepository.createOne(createBody)
  }

  editOne = async (tagName: string, editBody: EditBodyDto) => {
    return this.tagRepository.editOne(tagName, editBody)
  }

  removeOne = async (tagName: string) => {
    return this.tagRepository.removeOne(tagName)
  }
}
