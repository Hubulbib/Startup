import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import userController from '../../controllers/UserController/user.controller.js'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'

const router = Router()

router.get('/list', [], userController.getAllForList)

router.get('/:id', [], userController.getOneById)

router.get('', [], userController.getAll)

router.put('/:id', [AuthMiddleware, RoleMiddleware.UserRole], userController.editOne)

router.delete('/:id', [AuthMiddleware], userController.removeOne)

export default router
