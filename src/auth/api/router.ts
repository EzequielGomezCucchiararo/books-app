import express from 'express';
import { bootstrap } from './bootstrap';

const { signUpHandler } = bootstrap();

const router = express.Router();

router.post('/sign-up', signUpHandler);

export { router as authRouter };
