import { Router } from 'express'
import tagController from '../../controllers/TagController/tag.controller'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware/auth.middleware'
import { RoleMiddleware } from '../../middlewares/RoleMiddleware/role.middleware'

const router = Router()

router.post('/', [AuthMiddleware, RoleMiddleware.HeadRole], tagController.createOne)

router.get('/', [AuthMiddleware, RoleMiddleware.HeadRole], tagController.getAll)

router.patch('/:name', [AuthMiddleware, RoleMiddleware.HeadRole], tagController.editOne)

router.delete('/:name', [AuthMiddleware, RoleMiddleware.HeadRole], tagController.removeOne)

export default router
