import { describe, it, expect } from 'vitest';
import { signJWT, verifyJWT, sanitizeString } from '../server/security';
import { hashPassword, verifyPassword } from '../server/db';

describe('SkillPods Security & Cryptography Engine', () => {
  it('signs and verifies valid JWT tokens correctly', () => {
    const payload = {
      userId: 'usr-sanket-01',
      email: 'sanketbhende0@gmail.com',
      role: 'admin',
      name: 'Sanket Bhende'
    };

    const token = signJWT(payload, 7);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);

    const verified = verifyJWT(token);
    expect(verified).not.toBeNull();
    expect(verified?.email).toBe('sanketbhende0@gmail.com');
    expect(verified?.role).toBe('admin');
  });

  it('rejects tampered or forged JWT tokens', () => {
    const validToken = signJWT({
      userId: 'usr-dev-01',
      email: 'dev.patel@skillpods.io',
      role: 'student',
      name: 'Dev Patel'
    });

    const parts = validToken.split('.');
    const forgedToken = `${parts[0]}.${parts[1]}.fake_malicious_signature`;

    const verified = verifyJWT(forgedToken);
    expect(verified).toBeNull();
  });

  it('hashes passwords with PBKDF2 salt and verifies them accurately', () => {
    const password = 'SuperSecretPassword2026!';
    const { hash, salt } = hashPassword(password);

    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
    expect(verifyPassword(password, hash, salt)).toBe(true);
    expect(verifyPassword('WrongPassword', hash, salt)).toBe(false);
  });

  it('sanitizes malicious XSS HTML tags and javascript pseudo-protocols', () => {
    const dirty = '<script>alert("hacked")</script>Hello World';
    const clean = sanitizeString(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('alert("hacked")');
    expect(clean).toBe('Hello World');
  });
});
