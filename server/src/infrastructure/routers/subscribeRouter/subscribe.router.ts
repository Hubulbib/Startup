import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import SubscribeController from '../../controllers/SubscribeController/subscribe.controller'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'

const router = Router()

router.post('/:articleId', [AuthMiddleware, RoleMiddleware.MentorRole], SubscribeController.subscribe)

router.delete('/:articleId', [AuthMiddleware, RoleMiddleware.MentorRole], SubscribeController.unsubscribe)

export default router
