import { AuditLogger } from './auditLogger';
import { config } from './config';

interface SecurityMetrics {
  failedLogins: Map<string, number>;
  suspiciousActivities: Map<string, number>;
  lastReset: number;
}

export class SecurityMonitor {
  private static metrics: SecurityMetrics = {
    failedLogins: new Map(),
    suspiciousActivities: new Map(),
    lastReset: Date.now()
  };

  static trackFailedLogin(ip: string): void {
    const current = this.metrics.failedLogins.get(ip) || 0;
    this.metrics.failedLogins.set(ip, current + 1);

    if (current + 1 >= config.security.maxLoginAttempts) {
      AuditLogger.log(
        'EXCESSIVE_LOGIN_ATTEMPTS',
        `IP ${ip} blocked after ${current + 1} failed attempts`,
        'critical',
        undefined,
        ip
      );
    }
  }

  static trackSuspiciousActivity(ip: string, activity: string): void {
    const current = this.metrics.suspiciousActivities.get(ip) || 0;
    this.metrics.suspiciousActivities.set(ip, current + 1);

    AuditLogger.log(
      'SUSPICIOUS_ACTIVITY',
      `${activity} from IP ${ip}`,
      'warning',
      undefined,
      ip
    );
  }

  static resetMetrics(): void {
    this.metrics.failedLogins.clear();
    this.metrics.suspiciousActivities.clear();
    this.metrics.lastReset = Date.now();
  }

  static isIPBlocked(ip: string): boolean {
    return (this.metrics.failedLogins.get(ip) || 0) >= config.security.maxLoginAttempts;
  }
}

// Reset metrics every hour
setInterval(() => {
  SecurityMonitor.resetMetrics();
}, 3600000);