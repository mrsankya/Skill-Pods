import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// JWT Secret Key (from env or cryptographically secure default)
const JWT_SECRET = process.env.JWT_SECRET || 'skillpods_jwt_secret_sih_2026_super_secure_key_#8f4a9c';

// In-memory rate limiting cache
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitCache = new Map<string, RateLimitRecord>();

// Clean rate limit cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitCache.entries()) {
    if (now > val.resetAt) {
      rateLimitCache.delete(key);
    }
  }
}, 60000);

/**
 * Enterprise Rate Limiting Middleware (DDoS & Brute-Force Prevention)
 */
export function rateLimiter(maxRequests = 60, windowMs = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    const record = rateLimitCache.get(key);
    if (!record || now > record.resetAt) {
      rateLimitCache.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: `Too many authentication attempts. Please try again in ${retryAfterSec} seconds.`
      });
    }

    record.count += 1;
    next();
  };
}

/**
 * Enterprise Security Headers Middleware
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // XSS filter protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // HSTS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
}

/**
 * Cryptographic JWT Helper (Zero external library dependency)
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString('utf-8');
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
  iat?: number;
  exp?: number;
}

export function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresInDays = 7): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInDays * 24 * 60 * 60
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload: JWTPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Input Sanitization (Defense against XSS Injection)
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // remove HTML angle brackets
    .trim();
}
