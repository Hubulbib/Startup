import { Schema, model, Document } from 'mongoose'
// import { IUser } from './interfaces/user.interface.js'

// export type IUserDoc = Document<any, any, IUser> & IUser

const schema = new Schema({
    name: {
        type: String,
        unique: true
    },
    permissions: [String], 
})

export const Role = model('Role', schema)


// const user = {
//     name: 'user',
//     permissions: []
// }

// const mentor = {
//     name: 'mentor',
//     permissions: [s
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