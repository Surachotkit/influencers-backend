import { Router } from 'express';
import { InfluencerController } from '../controllers/influencer';

const router = Router();
const controller = new InfluencerController();

router.post('/', controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.get('/profile/:userId', controller.getUserManagement.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;