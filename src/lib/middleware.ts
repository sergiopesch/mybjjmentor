import { Request, Response, NextFunction } from 'express';
import { RateLimiter } from './rateLimiter';
import { SecurityMonitor } from './securityMonitor';

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  
  if (SecurityMonitor.isIPBlocked(ip)) {
    return res.status(403).json({ error: 'IP blocked due to suspicious activity' });
  }

  if (!RateLimiter.checkLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  next();
};

export const securityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
};