
import { Request, Response, NextFunction } from 'express';
import { config } from './config';

let loginAttempts = new Map<string, number>();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  
  if (loginAttempts.get(ip) >= config.security.maxLoginAttempts) {
    return res.status(429).json({ error: 'Too many login attempts' });
  }

  if (!req.session?.user) {
    loginAttempts.set(ip, (loginAttempts.get(ip) || 0) + 1);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Reset attempts every 15 minutes
setInterval(() => {
  loginAttempts.clear();
}, 900000);
