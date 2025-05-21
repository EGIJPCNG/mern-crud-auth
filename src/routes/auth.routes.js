import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'


const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);


/// puedo crear otros routers para otras rutas
// router.get('/users', getUsers); 
// router.get('/users/:id', getUser);
// router.post('/users', createUser); 
// router.put('/users/:id', updateUser); 
// router.delete('/users/:id', deleteUser);

export default router;