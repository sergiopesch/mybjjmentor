import { SecurityDashboard } from './securityDashboard';
import { AuditLogger } from './auditLogger';
import { config } from './config';

export interface SecurityAlert {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'critical';
  message: string;
  metadata: Record<string, any>;
}

export class AlertSystem {
  private static alerts: SecurityAlert[] = [];
  private static readonly MAX_ALERTS = 100;

  static createAlert(
    type: 'info' | 'warning' | 'critical',
    message: string,
    metadata: Record<string, any> = {}
  ): void {
    const alert: SecurityAlert = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      type,
      message,
      metadata
    };

    this.alerts.unshift(alert);
    if (this.alerts.length > this.MAX_ALERTS) {
      this.alerts.pop();
    }

    if (type === 'critical') {
      AuditLogger.log('CRITICAL_ALERT', message, 'critical');
      this.notifyAdministrators(alert);
    }
  }

  static getActiveAlerts(): SecurityAlert[] {
    return this.alerts;
  }

  private static notifyAdministrators(alert: SecurityAlert): void {
    // Implement your notification logic here (email, SMS, etc.)
    console.error('[SECURITY ALERT]', alert.message, alert.metadata);
  }

  static startMonitoring(): void {
    setInterval(() => {
      const status = SecurityDashboard.getSecurityStatus();
      const metrics = SecurityDashboard.getMetrics();

      if (status === 'critical') {
        this.createAlert(
          'critical',
          'System under potential attack',
          { metrics }
        );
      } else if (status === 'warning') {
        this.createAlert(
          'warning',
          'Elevated security concerns detected',
          { metrics }
        );
      }
    }, config.security.monitoringInterval || 60000);
  }
}

// Start monitoring when the system initializes
AlertSystem.startMonitoring();