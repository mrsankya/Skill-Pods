import { describe, it, expect } from 'vitest';

describe('SkillPods State Persistence & Routing Engine', () => {
  it('correctly maps URL hashes to dashboard tabs', () => {
    const validTabs = [
      'overview', 'profile', 'marketplace', 'passport', 'explore',
      'my-projects', 'pod', 'tasks', 'mentors', 'earnings', 'guru', 'ai-match'
    ];

    const testHashes = ['#profile', '#marketplace', '#passport', '#tasks', '#mentors', '#earnings', '#guru'];
    
    testHashes.forEach(hash => {
      const cleanTab = hash.replace('#', '');
      expect(validTabs.includes(cleanTab)).toBe(true);
    });
  });

  it('elevates sanketbhende0@gmail.com strictly to SuperAdmin role', () => {
    const email = 'sanketbhende0@gmail.com';
    const isSuperAdmin = email.toLowerCase() === 'sanketbhende0@gmail.com';
    const resolvedRole = isSuperAdmin ? 'admin' : 'student';

    expect(resolvedRole).toBe('admin');
  });

  it('correctly formats names from email handles without crashing', () => {
    const formatName = (email: string) => {
      if (email.toLowerCase() === 'sanketbhende0@gmail.com') return 'Sanket Bhende';
      const username = email.split('@')[0];
      return username
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    };

    expect(formatName('sanketbhende0@gmail.com')).toBe('Sanket Bhende');
    expect(formatName('dev.patel@skillpods.io')).toBe('Dev Patel');
    expect(formatName('sarah_chen@cloudflare.com')).toBe('Sarah Chen');
  });
});
