import { AuditLogger } from './auditLogger';
import { config } from './config';

interface SecurityMetrics {
  failedLogins: Map<string, number>;
  suspiciousActivities: Map<string, number>;
  threatScores: Map<string, number>;
  blockedIPs: Set<string>;
  lastReset: number;
}

interface ThreatEvent {
  type: string;
  severity: number;
  timestamp: number;
}

export class SecurityMonitor {
  private static metrics: SecurityMetrics = {
    failedLogins: new Map(),
    suspiciousActivities: new Map(),
    threatScores: new Map(),
    blockedIPs: new Set(),
    lastReset: Date.now()
  };

  private static readonly THREAT_WEIGHTS = {
    LOGIN_FAILURE: 10,
    RATE_LIMIT: 15,
    BOT_DETECTED: 25,
    INVALID_TOKEN: 20,
    SQL_INJECTION: 50,
    XSS_ATTEMPT: 40
  };

  private static readonly BLOCK_THRESHOLD = 100;

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

  static assessThreat(ip: string, eventType: string): void {
    const currentScore = this.metrics.threatScores.get(ip) || 0;
    const weight = this.THREAT_WEIGHTS[eventType as keyof typeof this.THREAT_WEIGHTS] || 5;
    const newScore = currentScore + weight;
    
    this.metrics.threatScores.set(ip, newScore);
    
    if (newScore >= this.BLOCK_THRESHOLD) {
      this.blockIP(ip);
      AuditLogger.log(
        'IP_BLOCKED',
        `IP ${ip} blocked due to high threat score: ${newScore}`,
        'critical',
        undefined,
        ip
      );
    }
  }

  static blockIP(ip: string): void {
    this.metrics.blockedIPs.add(ip);
  }

  static unblockIP(ip: string): void {
    this.metrics.blockedIPs.delete(ip);
    this.metrics.threatScores.delete(ip);
  }

  static resetMetrics(): void {
    this.metrics.failedLogins.clear();
    this.metrics.suspiciousActivities.clear();
    this.metrics.threatScores.clear();
    this.metrics.lastReset = Date.now();
    // Maintain IP blocks across resets
  }

  static isIPBlocked(ip: string): boolean {
    return (this.metrics.failedLogins.get(ip) || 0) >= config.security.maxLoginAttempts;
  }
}

// Reset metrics every hour
setInterval(() => {
  SecurityMonitor.resetMetrics();
}, 3600000);