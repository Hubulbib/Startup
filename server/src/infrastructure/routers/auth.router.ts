import { Router } from 'express'
import authController from '../controllers/auth.controller.js'

const router = Router()

router.post(
  '/registration',
  [
    /*  authMiddleware,
  //могут получить все (+не авториз.), но надо валидировать ответ от приватных полей
  validate(userFields)*/
  ],
  authController.createOne,
)

router.post(
  '/',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  authController.auth,
)

export default router
