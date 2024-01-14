import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import userController from '../../controllers/user.controller.js'

const router = Router()

router.get('/list', [], userController.getAllForList)

router.get('/:id', [], userController.getOneById)

router.get('', [], userController.getAll)

router.put('/:id', [AuthMiddleware], userController.editOne)

router.delete('/:id', [AuthMiddleware], userController.removeOne)

export default router
