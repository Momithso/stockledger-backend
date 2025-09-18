import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

/**
 * Routes
 */
router.use('/', healthRoutes);

export default router;