import { Router } from 'express';
import authRouter from './auth.routes.js';
import { success } from '../utils/response.js';

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json(success({ status: 'ok' }));
});

apiRouter.use('/auth', authRouter);

export default apiRouter;
