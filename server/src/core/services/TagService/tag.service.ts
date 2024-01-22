import { type TagRepository } from '../../repositories/TagRepository/tag.repository'
import { type CreateBodyDto } from '../../repositories/TagRepository/dtos/create-body.dto'
import { type EditBodyDto } from '../../repositories/TagRepository/dtos/edit-body.dto'

export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  getAll = async (): Promise<string[]> => {
    const tagData = await this.tagRepository.getAll()
    return tagData.map((el) => el.name)
  }

  createOne = async (createBody: CreateBodyDto) => {
    return await this.tagRepository.createOne(createBody)
  }

  editOne = async (tagName: string, editBody: EditBodyDto) => {
    return await this.tagRepository.editOne(tagName, editBody)
  }

  removeOne = async (tagName: string) => {
    await this.tagRepository.removeOne(tagName)
  }
}
