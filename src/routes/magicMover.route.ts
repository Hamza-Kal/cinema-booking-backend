import { Router } from 'express';
import { createMagicMoverController } from '../controllers/magicMover.controller';
import { createMagicMover } from '../services/magicMover.services';

const router = Router();

router.post('/movers/create', createMagicMoverController);


export default router;
