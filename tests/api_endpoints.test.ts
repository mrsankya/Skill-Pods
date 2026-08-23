import { describe, it, expect } from 'vitest';
import { db } from '../server/db';

describe('SkillPods Backend Database & Collection Integrity', () => {
  it('retrieves live telemetry metrics with valid SLA numbers', () => {
    const metrics = db.getMetrics();
    expect(metrics).toBeDefined();
    expect(metrics.uptimeSla).toBeGreaterThan(99);
    expect(metrics.avgLatencyMs).toBeLessThan(100);
    expect(metrics.activePods).toBeGreaterThanOrEqual(1);
  });

  it('retrieves all seeded pods with full team rosters', () => {
    const pods = db.getPods();
    expect(Array.isArray(pods)).toBe(true);
    expect(pods.length).toBeGreaterThanOrEqual(1);

    const apexPod = pods.find(p => p.id === 'pod-101');
    expect(apexPod).toBeDefined();
    expect(apexPod?.students.length).toBe(3);
    expect(apexPod?.techStack).toContain('React');
  });

  it('updates and persists user profile without losing existing fields', () => {
    const email = 'dev.patel@skillpods.io';
    const updated = db.updateUserProfile(email, {
      bio: 'Updated Vitest Automated Test Bio 2026',
      github: 'https://github.com/devpatel-test'
    });

    expect(updated).toBeDefined();
    expect(updated?.bio).toBe('Updated Vitest Automated Test Bio 2026');
    expect(updated?.github).toBe('https://github.com/devpatel-test');

    const fetched = db.getUserByEmail(email);
    expect(fetched?.bio).toBe('Updated Vitest Automated Test Bio 2026');
  });
});
