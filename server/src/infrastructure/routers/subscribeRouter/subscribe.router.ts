import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import SubscribeController from '../../controllers/subscribe.controller'

const router = Router()

router.post('/:articleId', [AuthMiddleware], SubscribeController.subscribe)

router.delete('/:articleId', [AuthMiddleware], SubscribeController.unsubscribe)

export default router
