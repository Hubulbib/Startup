import { getModelForClass, modelOptions, prop, Severity } from '@typegoose/typegoose'
import { BaseDates } from './user.entity'

@modelOptions({
  schemaOptions: { collection: 'tag' },
  options: {
    customName: 'tag',
    allowMixed: Severity.ALLOW,
  },
})
export class Tag {
  @prop({ type: String, required: true, unique: true })
  name: string

  @prop({ type: () => BaseDates, default: {}, required: true, _id: false })
  dates: BaseDates
}

export const tagModel = getModelForClass(Tag, {
  options: { allowMixed: Severity.ALLOW },
})
