import { Router } from 'express';
import { main } from '@/controllers/main';

const router: Router = Router();

router.get('/', main);

export { router as mainRoutes };
