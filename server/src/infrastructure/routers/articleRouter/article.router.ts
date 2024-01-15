import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'
import articleController from '../../controllers/ArticleController/article.controller.js'
import { EditOneMiddleware } from './middlewares/edit-one.middleware'

const router = Router()

router.post('', [AuthMiddleware, RoleMiddleware.MentorRole], articleController.createOne)

router.get('', [], articleController.getAll)

router.get('/:id/detail', [], articleController.getDetail)

router.get('/:id', [], articleController.getOneById)

router.put('/:id', [EditOneMiddleware], articleController.editOne)

router.patch('/:id/view', [], articleController.incView)

router.patch('/:id/like', [AuthMiddleware], articleController.incLike)

router.delete('/:id', [AuthMiddleware, RoleMiddleware.MentorRole], articleController.removeOne)

export default router
