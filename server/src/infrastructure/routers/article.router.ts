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

router.get('/:id/detail', articleController.getDetail)

router.get(
  '/:id',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  articleController.getOneById,
)


// миддлвар на админа/автора при непосредственном редактировании
// автор меняет content
// админ меняет status

// если просмотры, то пут запрос без Authorization
// остальное - с хедером -> аус гвард
router.put(
  '/:id',
  [
    /*  validate(userFields)*/
  ],
  articleController.editOne,
)

router.delete('/:id', articleController.removeOne)

export default router
