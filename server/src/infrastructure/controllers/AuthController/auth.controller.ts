import { Request, Response } from 'express'
import { AuthService } from '../../../core/services/AuthService/auth.service.js'
import { AuthRepositoryImpl } from '../../db/repositories/auth.repository.impl.js'
import 'dotenv/config'
import { ResponseTokenDto } from './dtos/response-token.dto'
import { IAuthRequest } from '../../interfaces/auth-request.interface'

class AuthController {
  constructor(readonly authService: AuthService) {}

  signIn = async (req: Request, res: Response) => {
    try {
      const detail = { ua: req.get('User-Agent'), ip: req.ip }
      const authBody = req.body
      const authData = await this.authService.signIn(authBody, detail)
      this.resCookieRefreshToken(res, authData.refreshToken)
      res.json(new ResponseTokenDto(authData))
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  signUp = async (req: Request, res: Response) => {
    try {
      const detail = { ua: req.get('User-Agent'), ip: req.ip }
      const authBody = req.body
      const authData = await this.authService.signUp(authBody, detail)
      this.resCookieRefreshToken(res, authData.refreshToken)
      return res.status(201).json(new ResponseTokenDto(authData))
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  refresh = async (req: IAuthRequest, res: Response) => {
    try {
      const detail = { ua: req.get('User-Agent'), ip: req.ip }
      const authBody = req.cookies
      const authData = await this.authService.refresh(authBody, detail)
      this.resCookieRefreshToken(res, authData.refreshToken)
      return res.json(new ResponseTokenDto(authData))
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  logout = async (req: IAuthRequest, res: Response) => {
    try {
      const { refreshToken } = req.body
      const authData = await this.authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(authData)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  private resCookieRefreshToken = (res: Response, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, { maxAge: +process.env.MAX_AGE_TOKEN, httpOnly: true, path: '/api/auth' })
  }
}

export default new AuthController(new AuthService(new AuthRepositoryImpl()))
