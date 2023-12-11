export interface IUser {
  _id: string
  name: string
  surname: string
  email: string
  password: string
  role: string
  rating: Rating[]
  avatar: string
}

interface Rating {
  speed: number
  learn: number
  polite: number
}
