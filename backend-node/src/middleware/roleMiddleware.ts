import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    next();
  };
};
