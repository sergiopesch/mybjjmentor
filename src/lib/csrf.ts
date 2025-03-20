
import { NextFunction, Request, Response } from 'express';

export const generateCSRFToken = () => {
  return Math.random().toString(36).slice(2);
};

export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const clientToken = req.headers['x-csrf-token'];
    const serverToken = req.session?.csrfToken;
    
    if (!clientToken || !serverToken || clientToken !== serverToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  next();
};
