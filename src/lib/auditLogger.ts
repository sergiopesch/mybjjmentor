import { EncryptionService } from './encryption';

interface AuditLog {
  timestamp: string;
  action: string;
  userId?: string;
  ip?: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export class AuditLogger {
  private static logs: AuditLog[] = [];
  private static readonly MAX_LOGS = 1000;

  static log(
    action: string,
    details: string,
    severity: 'info' | 'warning' | 'critical' = 'info',
    userId?: string,
    ip?: string
  ): void {
    const logEntry: AuditLog = {
      timestamp: new Date().toISOString(),
      action,
      userId,
      ip,
      details: EncryptionService.encrypt(details).encryptedData,
      severity
    };

    this.logs.unshift(logEntry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    if (severity === 'critical') {
      console.error('[CRITICAL SECURITY EVENT]', action);
    }
  }

  static getRecentLogs(count: number = 50): AuditLog[] {
    return this.logs.slice(0, count);
  }

  static clearLogs(): void {
    this.logs = [];
  }
}