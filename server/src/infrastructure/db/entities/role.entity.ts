import { Schema, model, Document } from 'mongoose'
import { IRole } from './interfaces/role.interface'

export type IRoleDoc = Document<any, any, IRole> & IRole

const schema = new Schema<IRole>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  permissions: { type: [String], default: [] },
})

export const Role = model('Role', schema)

// const user = {
//     name: 'user',
//     permissions: []
// }

// const mentor = {
//     name: 'mentor',
//     permissions: [
//         'create',
//         'edit',
//     ]
// }

// const admin = {
//     name: 'admin',
//     permissions: [
//         'verification',
//         'penalty',
//         'ban',
//     ]
// }

// const owner = {
//     name: 'owner',
//     permissions: [
//         'db-roles',
//         'mentor-request'
//     ]
// }

// endpoints
// изменение/создание ролей
// гет // пут // делит
