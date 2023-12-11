import { Router } from 'express'
import articleController from '../controllers/article.controller.js'

const router = Router()

router.post('', [], articleController.createOne)

router.get(
  '',
  [
    /*  authMiddleware,
  //могут получить все (+не авториз.), но надо валидировать ответ от приватных полей
  validate(userFields)*/
  ],
  articleController.getAll,
)

router.get(
  '/:id',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  articleController.getOneById,
)

router.put(
  '/:id',
  [
    /*  validate(userFields)*/
  ],
  articleController.editOne,
)

router.delete('/:id', articleController.removeOne)

export default router
