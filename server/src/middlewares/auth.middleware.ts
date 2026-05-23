// Extract Bearer token from Authorization header
// Verify JWT → attach req.user to request
// Return 401 if invalid/expired
import { Request, Response, NextFunction as ExpressNextFunction } from 'express';

import { verifyToken as decodeToken } from '../utils/jwt.js';
import { sendError } from '../utils/response.js';

export const verifyToken = (
  req: any,
  res: any,
  next: ExpressNextFunction
): void => {
  const authHeader = (req.headers as any).authorization;
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
