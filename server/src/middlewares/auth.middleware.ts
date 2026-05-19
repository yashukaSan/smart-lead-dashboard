// Extract Bearer token from Authorization header
// Verify JWT → attach req.user to request
// Return 401 if invalid/expiredimport { Request, Response, NextFunction } from 'express';

import { verifyToken as decodeToken } from '../utils/jwt';
import { sendError } from '../utils/response';

export const verifyToken = (
  req: Request, res: Response, next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    sendError(res, 401, 'No token provided');
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = decodeToken(token);

  if (!payload) {
    sendError(res, 401, 'Invalid or expired token');
    return;
  }

  req.user = payload;
  next();
};
