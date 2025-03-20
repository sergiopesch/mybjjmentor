import { EncryptionService } from './encryption';

export class SecureStorage {
  private static readonly PREFIX = 'secure_';

  static setItem(key: string, value: string): void {
    const encrypted = EncryptionService.encrypt(value);
    const secureData = JSON.stringify(encrypted);
    sessionStorage.setItem(this.PREFIX + key, secureData);
  }

  static getItem(key: string): string | null {
    const secureData = sessionStorage.getItem(this.PREFIX + key);
    if (!secureData) return null;

    try {
      const encrypted = JSON.parse(secureData);
      return EncryptionService.decrypt(
        encrypted.encryptedData,
        encrypted.iv,
        encrypted.authTag
      );
    } catch (error) {
      console.error('Secure storage decryption failed:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    sessionStorage.removeItem(this.PREFIX + key);
  }

  static clear(): void {
    Object.keys(sessionStorage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => sessionStorage.removeItem(key));
  }
}