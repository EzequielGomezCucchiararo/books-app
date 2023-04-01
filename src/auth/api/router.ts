import express from 'express';
import { bootstrap } from './bootstrap';

const { signInHandler, signUpHandler } = bootstrap();

const router = express.Router();

router.post('/sign-in', signInHandler);
router.post('/sign-up', signUpHandler);

export { router as authRouter };
