import {Router} from 'express'
import { login, register, logout, profile} from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router ();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired ,profile);


/// puedo crear otros routers para otras rutas
// router.get('/users', getUsers); 
// router.get('/users/:id', getUser);
// router.post('/users', createUser); 
// router.put('/users/:id', updateUser); 
// router.delete('/users/:id', deleteUser);

export default router;