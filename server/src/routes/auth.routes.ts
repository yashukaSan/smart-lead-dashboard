// POST /api/auth/register
// POST /api/auth/login
// GET /api/auth/me (protected)

import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validators/auth.validator';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login',    validateLogin,    login);
router.get('/me',        verifyToken,      getMe);

export default router;