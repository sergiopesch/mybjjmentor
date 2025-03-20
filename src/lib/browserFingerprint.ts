import { Request } from 'express';
import { createHash } from 'crypto';

interface FingerprintData {
  ip: string;
  userAgent: string;
  acceptHeaders: string;
  language: string;
  encoding: string;
  timestamp: number;
}

export class BrowserFingerprint {
  private static fingerprints: Map<string, FingerprintData> = new Map();

  static generateFingerprint(req: Request): string {
    const data: FingerprintData = {
      ip: req.ip || req.socket.remoteAddress || 'unknown',
      userAgent: req.headers['user-agent'] || '',
      acceptHeaders: req.headers['accept'] || '',
      language: req.headers['accept-language'] || '',
      encoding: req.headers['accept-encoding'] || '',
      timestamp: Date.now()
    };

    const fingerprintString = Object.values(data).join('|');
    return createHash('sha256').update(fingerprintString).digest('hex');
  }

  static trackFingerprint(fingerprint: string, data: FingerprintData): void {
    this.fingerprints.set(fingerprint, data);
  }

  static isKnownFingerprint(fingerprint: string): boolean {
    return this.fingerprints.has(fingerprint);
  }

  static analyzeSuspiciousPatterns(fingerprint: string): boolean {
    const data = this.fingerprints.get(fingerprint);
    if (!data) return false;

    // Check for rapid IP changes with same fingerprint
    const similarFingerprints = Array.from(this.fingerprints.values())
      .filter(f => f.userAgent === data.userAgent && f.ip !== data.ip);

    if (similarFingerprints.length > 5) {
      return true;
    }

    return false;
  }

  static cleanupOldFingerprints(): void {
    const TWO_HOURS = 7200000;
    const now = Date.now();
    
    for (const [fingerprint, data] of this.fingerprints.entries()) {
      if (now - data.timestamp > TWO_HOURS) {
        this.fingerprints.delete(fingerprint);
      }
    }
  }
}

// Cleanup old fingerprints periodically
setInterval(() => {
  BrowserFingerprint.cleanupOldFingerprints();
}, 3600000);