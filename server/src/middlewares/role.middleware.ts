// Accept allowed roles array: authorizeRoles('admin')
// Return 403 if user role is not in allowed list

import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/user.types';
import { sendError } from '../utils/response';

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, 'Not authenticated');
      return;
    }
    if (!roles.includes(req.user.role)) {
      sendError(res, 403, 'Access denied');
      return;
    }
    next();
  };
};
