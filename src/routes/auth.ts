import { Router } from 'express';
import { login, logout, isAuthenticated } from '@/controllers/auth';

const router: Router = Router();

router.post('/login', login);
router.get('/logout', isAuthenticated, logout);

export { router as authRoutes };
