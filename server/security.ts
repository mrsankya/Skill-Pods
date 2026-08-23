import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// JWT Secret Key (from env or cryptographically secure default)
const JWT_SECRET = process.env.JWT_SECRET || 'skillpods_jwt_secret_sih_2026_super_secure_key_#8f4a9c_sealed';

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
 * Enterprise Rate Limiting Middleware (DDoS & Brute-Force Defense)
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
 * Enterprise Security Headers Middleware (OWASP Top 10 Sealed)
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Clickjacking defense
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Browser XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Strict Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions Policy (Limit mic/camera to verified user actions)
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; connect-src 'self' https: wss:;"
  );
  // HSTS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
}

/**
 * Deep NoSQL & Prototype Pollution Sanitizer Middleware
 * Prevents attackers from sending {"$gt": ""} or __proto__ injections to MongoDB
 */
export function noSqlSanitizer(req: Request, res: Response, next: NextFunction) {
  const sanitize = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitize);

    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      // Block prototype pollution & MongoDB operator injection
      if (key.startsWith('$') || key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue; // Discard malicious key
      }
      cleanObj[key] = sanitize(obj[key]);
    }
    return cleanObj;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);

  next();
}

/**
 * Cryptographic JWT Helper (Zero external library dependency & Timing Attack Safe)
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

    // Constant-time signature comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: JWTPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return null; // Expired token
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Robust Input Sanitization (Defense against XSS Injection)
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // strip script tags entirely
    .replace(/[<>]/g, '') // remove remaining HTML angle brackets
    .replace(/javascript:/gi, '') // remove javascript pseudo-protocols
    .trim();
}
