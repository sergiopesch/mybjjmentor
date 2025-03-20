import { SecureStorage } from './secureStorage';
import { AuditLogger } from './auditLogger';
import { config } from './config';

interface Session {
  userId: string;
  expiresAt: number;
  roles: string[];
}

export class SessionManager {
  private static readonly SESSION_KEY = 'user_session';
  private static readonly TOKEN_KEY = 'auth_token';

  static createSession(userId: string, roles: string[] = []): void {
    const session: Session = {
      userId,
      expiresAt: Date.now() + (config.security.sessionTimeout * 1000),
      roles
    };
    
    SecureStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    AuditLogger.log('SESSION_CREATED', 'New session created', 'info', userId);
  }

  static getSession(): Session | null {
    const sessionData = SecureStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;

    try {
      const session = JSON.parse(sessionData) as Session;
      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return null;
      }
      return session;
    } catch (error) {
      this.clearSession();
      return null;
    }
  }

  static hasRole(role: string): boolean {
    const session = this.getSession();
    return session?.roles.includes(role) ?? false;
  }

  static clearSession(): void {
    const session = this.getSession();
    if (session) {
      AuditLogger.log('SESSION_CLEARED', 'Session cleared', 'info', session.userId);
    }
    SecureStorage.removeItem(this.SESSION_KEY);
    SecureStorage.removeItem(this.TOKEN_KEY);
  }

  static refreshSession(): void {
    const session = this.getSession();
    if (session) {
      this.createSession(session.userId, session.roles);
    }
  }
}