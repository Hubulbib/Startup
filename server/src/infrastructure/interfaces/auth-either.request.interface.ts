import { Request } from 'express'
import { IAuthRequest } from './auth.request.interface'

export type IAuthEitherRequest = Request | IAuthRequest
