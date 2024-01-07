import { Router } from 'express'
import roleController from '../controllers/role.controller'

const router = Router()

router.post('', [], roleController.createOne)

router.get(
  '',
  [
    /*  authMiddleware,
  //могут получить все (+не авториз.), но надо валидировать ответ от приватных полей
  validate(userFields)*/
  ],
  roleController.getAll,
)

router.get(
  '/:name',
  [
    /*  authMiddleware,
  roleMiddleware(['admin']),*/
  ],
  roleController.getByName,
)

// миддлвар на админа/автора при непосредственном редактировании
// автор меняет content
// админ меняет status

// если просмотры, то пут запрос без Authorization
// остальное - с хедером -> аус гвард
router.put(
  '/:name',
  [
    /*  validate(userFields)*/
  ],
  roleController.editOne,
)

router.delete('/:name', roleController.removeOne)

export default router
