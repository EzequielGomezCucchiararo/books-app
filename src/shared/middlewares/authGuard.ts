import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface TokenPayload {
  id: string;
  name: string;
}

interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authGuard = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
