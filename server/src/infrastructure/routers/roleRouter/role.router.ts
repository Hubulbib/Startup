import { Router } from 'express'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import roleController from '../../controllers/RoleController/role.controller'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'

const router = Router()

router.post('', [AuthMiddleware, RoleMiddleware.HeadRole], roleController.createOne)

router.get('', [AuthMiddleware, RoleMiddleware.HeadRole], roleController.getAll)

router.get('/:name', [AuthMiddleware, RoleMiddleware.HeadRole], roleController.getByName)

router.put('/:name', [AuthMiddleware, RoleMiddleware.HeadRole], roleController.editOne)

router.delete('/:name', [AuthMiddleware, RoleMiddleware.HeadRole], roleController.removeOne)

export default router
