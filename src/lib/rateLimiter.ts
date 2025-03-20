import { SecurityMonitor } from './securityMonitor';
import { AuditLogger } from './auditLogger';
import { config } from './config';

interface RateLimit {
  count: number;
  firstRequest: number;
}

export class RateLimiter {
  private static limits: Map<string, RateLimit> = new Map();
  private static readonly CLEANUP_INTERVAL = 3600000; // 1 hour

  static checkLimit(ip: string): boolean {
    const now = Date.now();
    const limit = this.limits.get(ip) || { count: 0, firstRequest: now };

    // Reset if outside window
    if (now - limit.firstRequest > config.api.rateLimits.window) {
      limit.count = 1;
      limit.firstRequest = now;
      this.limits.set(ip, limit);
      return true;
    }

    // Increment and check
    limit.count++;
    this.limits.set(ip, limit);

    if (limit.count > config.api.rateLimits.maxRequests) {
      SecurityMonitor.trackSuspiciousActivity(ip, 'Rate limit exceeded');
      AuditLogger.log(
        'RATE_LIMIT_EXCEEDED',
        `IP ${ip} exceeded rate limit: ${limit.count} requests`,
        'warning',
        undefined,
        ip
      );
      return false;
    }

    return true;
  }

  static cleanupStaleEntries(): void {
    const now = Date.now();
    for (const [ip, limit] of this.limits.entries()) {
      if (now - limit.firstRequest > config.api.rateLimits.window) {
        this.limits.delete(ip);
      }
    }
  }
}

// Cleanup stale entries periodically
setInterval(() => {
  RateLimiter.cleanupStaleEntries();
}, RateLimiter.CLEANUP_INTERVAL);