import { Request, Response, NextFunction } from 'express';
import { config } from './config';

let loginAttempts = new Map<string, number>();

export const sessionManager = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session;

  if (session) {
    // Extend session if user is active
    if (session.lastActivity) {
      const now = Date.now();
      const timeSinceLastActivity = now - session.lastActivity;

      if (timeSinceLastActivity > config.security.sessionTimeout * 1000) {
        req.session.destroy((err) => {
          if (err) console.error('Session destruction error:', err);
        });
        return res.status(440).json({ error: 'Session expired' });
      }
      session.lastActivity = now;
    }
  }
  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

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