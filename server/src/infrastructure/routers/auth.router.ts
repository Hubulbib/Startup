import { Router } from 'express'
import authController from '../controllers/auth.controller.js'

const router = Router()

router.post(
  '/sign-in',
  [
    /*  authMiddleware,
  //могут получить все (+не авториз.), но надо валидировать ответ от приватных полей
  validate(userFields)*/
  ],
  authController.signIn,
)

router.post(
  '/sign-up',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  authController.signUp,
)

router.get(
  '/refresh',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  authController.refresh,
)

router.post(
  '/logout',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  authController.logout,
)

export default router
