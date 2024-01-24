import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'
import articleController from '../../controllers/ArticleController/article.controller.js'
import { EditOneMiddleware } from './middlewares/edit-one.middleware'
import { AuthEitherMiddleware } from '../../middlewares/AuthMiddleware/auth-either.middleware'

const router = Router()

router.post('', [AuthMiddleware, RoleMiddleware.MentorRole], articleController.createOne)

router.get('', [AuthEitherMiddleware], articleController.getAll)

router.get('/:id/detail', [], articleController.getDetail)

// а зачем он нужен?
router.get('/:id', [], articleController.getOneById)

router.put('/:id', [EditOneMiddleware], articleController.editOne)

router.patch('/:id/view', [], articleController.incView)

router.patch('/:id/inc-like', [AuthMiddleware], articleController.incLike)

router.patch('/:id/dec-like', [AuthMiddleware], articleController.decLike)

router.delete('/:id', [AuthMiddleware, RoleMiddleware.MentorRole], articleController.removeOne)

export default router
