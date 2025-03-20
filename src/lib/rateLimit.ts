
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Create IP-based storage for tracking request counts
const ipStorage = new Map<string, number>();

export const createRateLimiter = (windowMs: number, max: number) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request): string => {
      return req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    },
    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        error: 'Too many requests, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    },
  });
};

export const apiLimiter = createRateLimiter(15 * 60 * 1000, 100);  // 100 requests per 15 minutes
export const authLimiter = createRateLimiter(60 * 60 * 1000, 5);   // 5 login attempts per hour
