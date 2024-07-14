import express from 'express';

const router = express.Router();
router.use('/health', (_req, res) => res.send('OK'));

export default router;
