import { NextFunction, Request, Response } from 'express';

export const requestFilter = (req: Request, res: Response, next: NextFunction) => {
  // Block requests with suspicious patterns
  const suspiciousPatterns = [
    /\.\./,                    // Directory traversal
    /<script>/i,              // XSS attempts
    /javascript:/i,           // JavaScript injection
    /(union|select|insert|drop|delete|update)\s+/i  // SQL injection attempts
  ];

  const requestContent = JSON.stringify({
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query
  });

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(requestContent));
  
  if (isSuspicious) {
    return res.status(400).json({ error: 'Invalid request detected' });
  }

  // Validate content length
  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 10 * 1024 * 1024) { // 10MB limit
    return res.status(413).json({ error: 'Request entity too large' });
  }

  next();
};