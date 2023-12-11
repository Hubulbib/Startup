import { Router } from 'express'
import SubscribeController from '../controllers/subscribe.controller'

const router = Router()

router.post('/:articleId', SubscribeController.subscribe)

router.delete('/:articleId', SubscribeController.unsubscribe)

export default router
