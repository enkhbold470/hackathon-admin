'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  ChevronLeft,
  Users
} from 'lucide-react';

interface StatsData {
  skillLevelDistribution: Record<string, number>;
  hackathonExperienceDistribution: Record<string, number>;
  tshirtSizeDistribution: Record<string, number>;
  selfDescriptionWordFrequency: Record<string, number>;
  hearAboutUsDistribution: Record<string, number>;
  submissionDates: Record<string, number>;
  statusDistribution: Record<string, number>;
  dietaryRestrictionsCount: number;
  totalApplications: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStats(data.stats);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Function to get background color for chart bars
  const getChartColors = (count: number) => {
    const baseColors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-amber-500',
      'bg-cyan-500', 'bg-lime-500', 'bg-orange-500', 'bg-teal-500'
    ];
    
    return Array(count).fill(0).map((_, i) => baseColors[i % baseColors.length]);
  };

  // Generic component for distribution charts
  const DistributionChart = ({ 
    data, 
    title, 
    icon
  }: { 
    data: Record<string, number> | undefined, 
    title: string,
    icon: React.ReactNode
  }) => {
    if (!data) return null;
    
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const colors = getChartColors(sortedEntries.length);
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <div className="space-y-3">
          {sortedEntries.map(([label, count], index) => (
            <div key={label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-medium">
                  {label === 'N/A' ? 'Not Specified' : label}
                </span>
                <span className="text-sm text-gray-800 font-semibold">
                  {count} ({Math.round((count / total) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${colors[index]}`} 
                  style={{ width: `${(count / total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Word Cloud for Self-Description
  const WordFrequencyCloud = ({ 
    data 
  }: { 
    data: Record<string, number> | undefined 
  }) => {
    if (!data) return null;
    
    const entries = Object.entries(data);
    const maxCount = Math.max(...entries.map(([_, count]) => count));
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <BarChart className="text-amber-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Self-Description Word Frequency</h3>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {entries.map(([word, count]) => {
            // Calculate font size based on frequency
            const fontSize = 14 + (count / maxCount) * 18;
            const opacity = 0.6 + (count / maxCount) * 0.4;
            
            return (
              <span 
                key={word}
                className="px-2 py-1 rounded bg-amber-50 border border-amber-100"
                style={{ 
                  fontSize: `${fontSize}px`,
                  opacity,
                  fontWeight: 500
                }}
              >
                {word} ({count})
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  // Submission Timeline Chart
  const SubmissionTimeline = ({ 
    data 
  }: { 
    data: Record<string, number> | undefined 
  }) => {
    if (!data) return null;
    
    // Sort dates
    const sortedDates = Object.entries(data)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    
    // Get min and max for scaling
    const maxCount = Math.max(...Object.values(data));
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <LineChart className="text-blue-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Application Submission Timeline</h3>
        </div>
        
        <div className="h-60 w-full relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
          <div className="flex items-end justify-between h-full">
            {sortedDates.map(([date, count]) => {
              // Format date to display
              const displayDate = new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              });
              
              // Calculate height percentage
              const heightPercentage = (count / maxCount) * 100;
              
              return (
                <div key={date} className="flex flex-col items-center flex-1" style={{ height: '100%' }}>
                  <div 
                    className="w-full mx-0.5 bg-blue-500 rounded-t-sm opacity-80"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-top-left">
                    {displayDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Status Distribution Chart
  const StatusDistribution = ({ 
    data 
  }: { 
    data: Record<string, number> | undefined 
  }) => {
    if (!data) return null;
    
    const statusColors: Record<string, string> = {
      'accepted': 'bg-green-500',
      'waitlisted': 'bg-yellow-500',
      'rejected': 'bg-red-500',
      'confirmed': 'bg-blue-500',
      'not_started': 'bg-gray-500',
      'N/A': 'bg-gray-300'
    };
    
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    const sortedEntries = Object.entries(data);
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <PieChart className="text-purple-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Application Status Distribution</h3>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="relative h-40 w-40">
            <svg viewBox="0 0 36 36" className="h-full w-full">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eeeeee" strokeWidth="3.8" />
              
              {sortedEntries.reduce((acc, [status, count], index) => {
                const percentage = (count / total) * 100;
                const startAngle = acc.offset;
                const endAngle = acc.offset + (percentage * 3.6);
                
                // Calculate SVG arc path
                const x1 = 18 + 15.9 * Math.cos((startAngle - 90) * (Math.PI / 180));
                const y1 = 18 + 15.9 * Math.sin((startAngle - 90) * (Math.PI / 180));
                const x2 = 18 + 15.9 * Math.cos((endAngle - 90) * (Math.PI / 180));
                const y2 = 18 + 15.9 * Math.sin((endAngle - 90) * (Math.PI / 180));
                
                const largeArcFlag = percentage > 50 ? 1 : 0;
                
                acc.elements.push(
                  <path 
                    key={status}
                    d={`M 18 18 L ${x1} ${y1} A 15.9 15.9 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={statusColors[status] || `hsl(${index * 60}, 70%, 60%)`}
                  />
                );
                
                acc.offset = endAngle;
                return acc;
              }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {sortedEntries.map(([status, count]) => (
            <div key={status} className="flex items-center gap-2">
              <div 
                className={`h-3 w-3 rounded-full ${statusColors[status] || 'bg-gray-500'}`}
              ></div>
              <span className="text-xs text-gray-700">
                {status === 'not_started' ? 'Pending' : status.charAt(0).toUpperCase() + status.slice(1)}: {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Summary Stats Card
  const SummaryCard = ({ stats }: { stats: StatsData | null }) => {
    if (!stats) return null;
    
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-md text-white">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
          <Users className="text-amber-400" size={24} />
          <h2 className="text-xl font-bold">DAHacks Application Summary</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm text-slate-300">Total Applications</div>
            <div className="text-2xl font-bold text-white">{stats.totalApplications}</div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm text-slate-300">Accepted</div>
            <div className="text-2xl font-bold text-green-400">
              {stats.statusDistribution?.accepted || 0}
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm text-slate-300">Waitlisted</div>
            <div className="text-2xl font-bold text-yellow-400">
              {stats.statusDistribution?.waitlisted || 0}
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-sm text-slate-300">Confirmed</div>
            <div className="text-2xl font-bold text-blue-400">
              {stats.statusDistribution?.confirmed || 0}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between shadow-md" style={{ backgroundColor: '#0f172a' }}>
        <div className="flex items-center text-white gap-3 text-lg font-bold">
          <Users className="text-amber-400" size={24} />
          DAHacks Statistics Dashboard
        </div>
        
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors text-white rounded-md text-sm"
        >
          <ChevronLeft size={18} />
          Back to Applications
        </button>
      </div>

      <div className="px-6 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="p-8 text-center text-gray-300 text-lg">Loading statistics...</div>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <SummaryCard stats={stats} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Level Distribution */}
              <DistributionChart 
                data={stats?.skillLevelDistribution} 
                title="Skill Level Distribution" 
                icon={<BarChart className="text-green-500" size={20} />}
              />
              
              {/* Hackathon Experience */}
              <DistributionChart 
                data={stats?.hackathonExperienceDistribution} 
                title="Hackathon Experience" 
                icon={<BarChart className="text-blue-500" size={20} />}
              />
              
              {/* How They Heard About DAHacks */}
              <DistributionChart 
                data={stats?.hearAboutUsDistribution} 
                title="How They Heard About DAHacks" 
                icon={<BarChart className="text-purple-500" size={20} />}
              />
              
              {/* T-Shirt Size Distribution */}
              <DistributionChart 
                data={stats?.tshirtSizeDistribution} 
                title="T-Shirt Size Distribution" 
                icon={<BarChart className="text-amber-500" size={20} />}
              />
              
              {/* Status Distribution */}
              <StatusDistribution data={stats?.statusDistribution} />
              
              {/* Word Frequency Cloud */}
              <WordFrequencyCloud data={stats?.selfDescriptionWordFrequency} />
              
              {/* Submission Timeline */}
              <div className="md:col-span-2">
                <SubmissionTimeline data={stats?.submissionDates} />
              </div>
              
              {/* Dietary Restrictions */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <BarChart className="text-red-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Dietary Restrictions</h3>
                </div>
                
                <div className="text-center p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stats?.dietaryRestrictionsCount || 0}</div>
                  <p className="text-gray-600">Applicants with NO dietary restrictions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
