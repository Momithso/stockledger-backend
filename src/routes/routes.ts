import { Router } from 'express';
import healthRoutes from './health.routes';
import authenticateRoutes from './authenticate.route'

const router = Router();

/**
 * Routes
 */
router.use('/', healthRoutes);
router.use('/authenticate', authenticateRoutes)

export default router;