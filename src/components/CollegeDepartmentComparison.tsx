import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Building,
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { DepartmentAnalytics } from '../types';

interface CollegeDepartmentComparisonProps {
  userEmail: string;
}

export const CollegeDepartmentComparison: React.FC<CollegeDepartmentComparisonProps> = ({
  userEmail
}) => {
  const [departments, setDepartments] = useState<DepartmentAnalytics[]>([
    {
      department: "Computer Science & Engineering",
      totalStudents: 240,
      activeInPods: 198,
      industryEngagementScore: 82.5,
      placementReadinessScore: 91.2,
      topSkills: ["FastAPI", "React 19", "PostgreSQL", "Docker", "Redis"],
      commercializedProjectsCount: 8,
      commercialValueGenerated: "₹4,20,000"
    },
    {
      department: "Information Technology",
      totalStudents: 180,
      activeInPods: 142,
      industryEngagementScore: 78.8,
      placementReadinessScore: 86.4,
      topSkills: ["Go", "MQTT", "TimescaleDB", "AWS", "WebSockets"],
      commercializedProjectsCount: 5,
      commercialValueGenerated: "₹2,65,000"
    },
    {
      department: "AI & Data Science",
      totalStudents: 120,
      activeInPods: 104,
      industryEngagementScore: 86.6,
      placementReadinessScore: 93.0,
      topSkills: ["PyTorch", "Vector Search (Qdrant)", "FastAPI", "OpenCV"],
      commercializedProjectsCount: 4,
      commercialValueGenerated: "₹2,10,000"
    },
    {
      department: "Electronics & Communication",
      totalStudents: 160,
      activeInPods: 98,
      industryEngagementScore: 61.2,
      placementReadinessScore: 74.5,
      topSkills: ["C++ Firmware", "LoRaWAN", "ESP32", "Edge AI"],
      commercializedProjectsCount: 2,
      commercialValueGenerated: "₹1,10,000"
    }
  ]);

  const [selectedMetric, setSelectedMetric] = useState<'Placement' | 'IndustryEngagement' | 'CommercialValue'>('Placement');

  const institutionalAverage = {
    totalStudents: departments.reduce((acc, d) => acc + d.totalStudents, 0),
    totalInPods: departments.reduce((acc, d) => acc + d.activeInPods, 0),
    avgPlacementReadiness: (departments.reduce((acc, d) => acc + d.placementReadinessScore, 0) / departments.length).toFixed(1),
    avgEngagement: (departments.reduce((acc, d) => acc + d.industryEngagementScore, 0) / departments.length).toFixed(1),
    totalCommercialValue: '₹10,05,000'
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <BarChart3 className="w-3.5 h-3.5 text-purple-700" />
              <span>Inter-Department Performance & Placement Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Department Comparison & Industry Engagement Score
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Benchmark departments on actual industry problem engagement, student pod completion rates, mentor-verified placement readiness, and commercial software value generated.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Institutional Readiness Index</div>
              <div className="text-2xs text-[#5c4780]">{institutionalAverage.avgPlacementReadiness}% Placement Ready Cohort</div>
            </div>
          </div>
        </div>

        {/* 4-Card Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200/50">
          <div className="bg-white/80 p-4 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Total Enrolled Cohort</span>
            <strong className="text-2xl font-black text-[#261543] block mt-0.5">{institutionalAverage.totalStudents}</strong>
            <span className="text-2xs text-purple-900 font-bold block mt-1">{institutionalAverage.totalInPods} in Active Pods</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-emerald-800 font-bold block">Avg Placement Readiness</span>
            <strong className="text-2xl font-black text-emerald-700 block mt-0.5">{institutionalAverage.avgPlacementReadiness}%</strong>
            <span className="text-2xs text-emerald-800 font-medium block mt-1">+18.4% vs state university avg</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-indigo-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-indigo-800 font-bold block">Industry Engagement Ratio</span>
            <strong className="text-2xl font-black text-indigo-900 block mt-0.5">{institutionalAverage.avgEngagement}%</strong>
            <span className="text-2xs text-slate-600 font-medium block mt-1">Students on Live SME Bounties</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-purple-900 font-bold block">Commercial Value Realized</span>
            <strong className="text-2xl font-black text-purple-900 block mt-0.5">{institutionalAverage.totalCommercialValue}</strong>
            <span className="text-2xs text-purple-700 font-bold block mt-1">Across 19 Commercial Pods</span>
          </div>
        </div>
      </div>

      {/* Metric Selector Filter */}
      <div className="flex items-center justify-between gap-4 pb-1">
        <h3 className="text-xl font-black text-[#261543]">
          Department Benchmark Matrix
        </h3>

        <div className="flex items-center gap-2">
          {[
            { id: 'Placement', label: 'Placement Readiness Score' },
            { id: 'IndustryEngagement', label: 'Industry Engagement %' },
            { id: 'CommercialValue', label: 'Commercial Value' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMetric(m.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMetric === m.id
                  ? 'bg-[#3b226e] text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white text-[#523d77] border border-white/80'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, idx) => (
          <motion.div
            key={dept.department}
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Rank #{idx + 1}
                </span>

                <div className="flex items-center gap-1.5 font-black text-xs text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dept.placementReadinessScore}% Placement Ready</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-[#261543]">{dept.department}</h4>
                <p className="text-xs text-[#5c4780] font-medium mt-0.5">
                  <strong>{dept.activeInPods}</strong> of {dept.totalStudents} students active in Skill Pods ({dept.industryEngagementScore}% Engagement)
                </p>
              </div>

              {/* Progress Visual Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-2xs font-bold text-slate-600">
                  <span>Industry Engagement Ratio</span>
                  <span>{dept.industryEngagementScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-700"
                    style={{ width: `${dept.industryEngagementScore}%` }}
                  />
                </div>
              </div>

              {/* Top Tech Skills */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b]">Dominant Verified Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {dept.topSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-purple-50 text-purple-900 rounded text-2xs font-bold border border-purple-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-2xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Commercial Assets</span>
                  <strong className="text-slate-900 font-bold block mt-0.5">{dept.commercializedProjectsCount} Projects Licensed</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Total Value Generated</span>
                  <strong className="text-purple-900 font-bold block mt-0.5">{dept.commercialValueGenerated}</strong>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
