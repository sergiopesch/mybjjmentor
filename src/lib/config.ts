
export const config = {
  security: {
    maxLoginAttempts: 5,
    sessionTimeout: 3600, // 1 hour
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
  },
  api: {
    rateLimits: {
      window: 900000, // 15 minutes
      maxRequests: 100,
    }
  },
  cors: {
    allowedOrigins: ['https://*.replit.dev'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowCredentials: true,
  }
};
