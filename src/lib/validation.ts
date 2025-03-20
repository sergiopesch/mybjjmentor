import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape'
  });
};

// Common validation schemas
export const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  password: z.string().min(12).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/),
});

export const sessionSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  duration: z.number().min(1).max(480),
  date: z.string().datetime(),
});

// Validation middleware
export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: any, res: any, next: any) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid input data' });
    }
  };
};