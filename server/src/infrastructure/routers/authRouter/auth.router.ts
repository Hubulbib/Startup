import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import authController from '../../controllers/AuthController/auth.controller.js'

const router = Router()

router.post('/sign-in', [], authController.signIn)

router.post('/sign-up', [], authController.signUp)

router.get('/refresh', authController.refresh)

router.post('/logout', [AuthMiddleware], authController.logout)

export default router
