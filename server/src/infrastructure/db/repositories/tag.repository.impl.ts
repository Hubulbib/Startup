import { tagModel } from '../entities/tag.entity'
import { TagMapper } from '../mappers/tag.mapper'
import { type TagEntity } from '../../../core/entites/tag.entity'
import { type TagRepository } from '../../../core/repositories/TagRepository/tag.repository'
import { type EditBodyDto } from '../../../core/repositories/TagRepository/dtos/edit-body.dto'
import { type CreateBodyDto } from '../../../core/repositories/TagRepository/dtos/create-body.dto'

export class TagRepositoryImpl implements TagRepository {
  private readonly tagRepository = tagModel

  async getAll(): Promise<TagEntity[]> {
    return (await this.tagRepository.find()).map((el) => TagMapper.toDomain(el))
  }

  async createOne(createBody: CreateBodyDto): Promise<TagEntity> {
    if (await this.tagRepository.findOne({ name: createBody.name })) {
      throw Error('Такой тег уже создан')
    }
    return TagMapper.toDomain(await this.tagRepository.create(createBody))
  }

  async removeOne(tagName: string): Promise<void> {
    await this.tagRepository.deleteOne({ name: tagName })
  }

  async editOne(tagName: string, editBody: EditBodyDto): Promise<TagEntity> {
    if (!(await this.tagRepository.findOne({ name: tagName }))) {
      throw Error('Такого тега не существует')
    }
    return TagMapper.toDomain(await this.tagRepository.findOneAndUpdate({ name: tagName }, editBody, { new: true }))
  }
}
