import { SecurityMonitor } from './securityMonitor';
import { AuditLogger } from './auditLogger';
import { config } from './config';

export interface SecurityMetrics {
  blockedIPs: number;
  totalFailedLogins: number;
  suspiciousActivities: number;
  criticalAlerts: number;
}

export class SecurityDashboard {
  static getMetrics(): SecurityMetrics {
    const failedLogins = SecurityMonitor.metrics.failedLogins;
    const suspiciousActivities = SecurityMonitor.metrics.suspiciousActivities;
    
    return {
      blockedIPs: Array.from(failedLogins.values()).filter(
        count => count >= config.security.maxLoginAttempts
      ).length,
      totalFailedLogins: Array.from(failedLogins.values()).reduce((a, b) => a + b, 0),
      suspiciousActivities: Array.from(suspiciousActivities.values()).reduce((a, b) => a + b, 0),
      criticalAlerts: AuditLogger.getRecentLogs()
        .filter(log => log.severity === 'critical').length
    };
  }

  static getBlockedIPs(): string[] {
    return Array.from(SecurityMonitor.metrics.failedLogins.entries())
      .filter(([_, count]) => count >= config.security.maxLoginAttempts)
      .map(([ip]) => ip);
  }

  static getSecurityStatus(): 'normal' | 'warning' | 'critical' {
    const metrics = this.getMetrics();
    
    if (metrics.criticalAlerts > 5 || metrics.blockedIPs > 10) {
      return 'critical';
    }
    
    if (metrics.totalFailedLogins > 20 || metrics.suspiciousActivities > 10) {
      return 'warning';
    }
    
    return 'normal';
  }
}