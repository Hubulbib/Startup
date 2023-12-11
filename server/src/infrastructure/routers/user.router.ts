import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = Router()

router.get('/list', [], userController.getAllForList)

router.get(
  '/:id',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  userController.getOneById,
)

router.get(
  '',
  [
    /*  authMiddleware,
  //могут получить все (+не авториз.), но надо валидировать ответ от приватных полей
  validate(userFields)*/
  ],
  userController.getAll,
)

router.put(
  '/:id',
  [
    /*  validate(userFields)*/
  ],
  userController.editOne,
)

router.delete('/:id', userController.removeOne)

export default router
