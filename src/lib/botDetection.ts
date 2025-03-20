import { Request } from 'express';
import { SecurityMonitor } from './securityMonitor';
import { AuditLogger } from './auditLogger';

interface BotSignature {
  userAgent: string;
  headers: string[];
  behaviors: string[];
  timestamp: number;
}

export class BotDetector {
  private static knownBots: Map<string, BotSignature> = new Map();
  private static readonly SUSPICIOUS_PATTERNS = [
    /crawler|bot|spider|wget|curl/i,
    /phantomjs|headless|selenium|puppeteer/i
  ];

  static analyzeRequest(req: Request): boolean {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || '';
    
    // Check for basic bot signatures
    if (this.SUSPICIOUS_PATTERNS.some(pattern => pattern.test(userAgent))) {
      this.trackBot(ip, {
        userAgent,
        headers: Object.keys(req.headers),
        behaviors: ['suspicious_user_agent'],
        timestamp: Date.now()
      });
      return true;
    }

    // Check for missing or suspicious headers
    if (!req.headers['accept-language'] || !req.headers['accept']) {
      this.trackBot(ip, {
        userAgent,
        headers: Object.keys(req.headers),
        behaviors: ['missing_standard_headers'],
        timestamp: Date.now()
      });
      return true;
    }

    return false;
  }

  private static trackBot(ip: string, signature: BotSignature): void {
    this.knownBots.set(ip, signature);
    SecurityMonitor.trackSuspiciousActivity(ip, 'Bot-like behavior detected');
    AuditLogger.log(
      'BOT_DETECTED',
      `Bot detected from IP ${ip}`,
      'warning',
      { signature },
      ip
    );
  }

  static isKnownBot(ip: string): boolean {
    return this.knownBots.has(ip);
  }

  static cleanupOldEntries(): void {
    const ONE_HOUR = 3600000;
    const now = Date.now();
    
    for (const [ip, signature] of this.knownBots.entries()) {
      if (now - signature.timestamp > ONE_HOUR) {
        this.knownBots.delete(ip);
      }
    }
  }
}

// Cleanup old entries periodically
setInterval(() => {
  BotDetector.cleanupOldEntries();
}, 3600000);