import { Request, Response } from 'express'
import { AuthService } from '../../core/services/AuthService/auth.service.js'
import { AuthRepositoryImpl } from '../db/repositories/auth.repository.impl.js'

class AuthController {
  constructor(readonly authService: AuthService) {}

  signIn = async (req: Request, res: Response) => {
    try {
      const detail = { ua: req.get('User-Agent'), ip: req.ip }
      const authBody = req.body
      const authData = await this.authService.signIn(authBody, detail)
      res.json(authData)
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
      return res.status(201).json(authData)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  refresh = async (req: Request, res: Response) => {
    try {
      const detail = { ua: req.get('User-Agent'), ip: req.ip }
      const authBody = req.body
      const authData = await this.authService.refresh(authBody, detail)
      return res.json(authData)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }

  logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      const authData = await this.authService.logout(refreshToken)
      return res.json(authData)
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  }
}

export default new AuthController(new AuthService(new AuthRepositoryImpl()))
