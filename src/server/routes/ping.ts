import { Router } from 'express';

const router = Router();
router.use('/ping', (req, res) => res.status(200).json({ status: 'ok' }));

export default router;
