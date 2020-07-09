import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const tokenDecoded = verify(token, authConfig.jwt.secret);
    // Forçar tipo no typescript
    const { sub } = tokenDecoded as TokenPayload;
    request.user = { id: sub };
    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
