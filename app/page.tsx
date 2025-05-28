'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { typography, borderRadius } from '@/lib/ui-config';
import { Search, Users, LogOut, Eye, BarChart, ChevronDown } from 'lucide-react';

interface Application {
  id: number;
  userId: string;
  cwid?: string;
  fullName?: string;
  discord?: string;
  email?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const DEFAULT_FILTERS = ["accepted", "confirmed", "waitlisted", "rejected", "pending"];
  const [statusFilters, setStatusFilters] = useState<string[]>(DEFAULT_FILTERS);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [totalApps, setTotalApps] = useState(0);

  const router = useRouter();

  // Fetch applications
  const fetchApplications = async (search = '', filters = DEFAULT_FILTERS) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) {
        params.set('search', search);
      }
      if (filters) {
        params.set('filters', filters.join(','));
      }

      const url = `/api/applications?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();

      setApplications(data.applications);
      setTotalApps(data.total);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Handle application status update
  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
      
      // Refresh applications list
      refreshApplications();
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const refreshApplications = () => {
    fetchApplications(searchQuery, statusFilters);
  };

  // Fetch applications whenever search query or status filters change. Also on mount
  useEffect(() => {
    refreshApplications();
  }, [searchQuery, statusFilters]);

  // Initial fetch on component mount
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node | null)) {
        setFilterMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          color: '#047857',
          text: 'Accepted',
          dotColor: 'bg-green-600'
        };
      case 'waitlisted':
        return {
          bg: 'rgba(234, 179, 8, 0.15)',
          color: '#b45309',
          text: 'Waitlisted',
          dotColor: 'bg-yellow-600'
        };
      case 'rejected':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          color: '#b91c1c',
          text: 'Rejected',
          dotColor: 'bg-red-600'
        };
      case 'confirmed':
        return {
          bg: 'rgba(79, 70, 229, 0.15)',
          color: '#4338ca',
          text: 'Confirmed',
          dotColor: 'bg-indigo-600'
        };
      default:
        return {
          bg: 'rgba(156, 163, 175, 0.15)',
          color: '#4b5563',
          text: 'Pending',
          dotColor: 'bg-gray-500'
        };
    }
  };

  const handleStatusFilterChange = (checked: boolean, status: string) => {
    if (checked) {
      setStatusFilters([...statusFilters, status]);
    } else {
      setStatusFilters(statusFilters.filter((filter) => filter !== status));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between shadow-md" style={{ backgroundColor: '#0f172a' }}>
        <div className="flex items-center text-white gap-3" style={{ 
          fontSize: typography.fontSize.formTitle, 
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.base
        }}>
          <Users className="text-amber-400" size={24} />
          DA Hacks Admission Panel
        </div>
        <div className="text-yellow-400 text-sm">
          Disclaimer: Desktop view is recommended
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/stats')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 transition-colors text-white rounded-md mr-2"
          >
            <BarChart size={18} />
            <span>Statistics</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors text-white rounded-md"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-6" style={{ backgroundColor: '#0f172a' }}>
        <form className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search by name, CWID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            style={{ 
              borderRadius: borderRadius.md,
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              fontSize: typography.fontSize.questionTitle,
            }}
          />
        </form>
      </div>

      {/* Filter dropdown */}
      <div className="px-6 pb-2">
        <div className="flex items-center gap-2 text-white">
          <div ref={filterMenuRef}>
            <button 
              type="button" 
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 transition-colors text-white rounded-md"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <span style={{ 
                fontSize: typography.fontSize.questionTitle,
                fontWeight: typography.fontWeight.medium
              }}>
                Filter
              </span>
              <ChevronDown size={18} className="text-white" />
            </button>
            {filterMenuOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1">
                <div className="px-3 py-2 text-blue-600 underline">
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setStatusFilters(DEFAULT_FILTERS);
                    }}
                  >
                    Reset all
                  </a>
                </div>
                {DEFAULT_FILTERS.map((filter) => (
                  <div className="px-3 py-2 flex items-center gap-2" key={filter}>
                    <input 
                      type="checkbox" 
                      id={filter} 
                      name={filter} 
                      checked={statusFilters.includes(filter)}
                      onChange={(e) => handleStatusFilterChange(e.target.checked, filter)}
                    />
                    <label htmlFor={filter}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</label> {/* capitalize first letter */}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className="ml-2">Showing {applications.length} of {totalApps} {totalApps === 1 ? 'application' : 'applications'}</span>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="overflow-hidden bg-white rounded-xl shadow-xl">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No applications found</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-6 py-4 text-gray-700" style={{ 
                    fontSize: typography.fontSize.questionTitle,
                    fontWeight: typography.fontWeight.semibold
                  }}>Name</th>
                  <th className="px-6 py-4 text-gray-700" style={{ 
                    fontSize: typography.fontSize.questionTitle,
                    fontWeight: typography.fontWeight.semibold
                  }}>CWID</th>
                  <th className="px-6 py-4 text-gray-700" style={{ 
                    fontSize: typography.fontSize.questionTitle,
                    fontWeight: typography.fontWeight.semibold
                  }}>Submitted (Los Angeles Time)</th>
                  <th className="px-6 py-4 text-gray-700" style={{ 
                    fontSize: typography.fontSize.questionTitle,
                    fontWeight: typography.fontWeight.semibold
                  }}>Status</th>
                  <th className="px-6 py-4 text-gray-700" style={{ 
                    fontSize: typography.fontSize.questionTitle,
                    fontWeight: typography.fontWeight.semibold
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => {
                  const statusBadge = getStatusBadge(application.status);
                  
                  return (
                    <tr key={application.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <td className="px-6 py-4 font-medium" style={{ fontSize: typography.fontSize.answerOption }}>
                        {application.fullName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600" style={{ fontSize: typography.fontSize.answerOption }}>
                        {application.cwid || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600" style={{ fontSize: typography.fontSize.answerOption }}>
                        {new Date(application.updatedAt).toLocaleString('en-US', { 
                          year: 'numeric', 
                          month: '2-digit', 
                          day: '2-digit', 
                          hour: '2-digit', 
                          minute: '2-digit', 
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full font-medium inline-flex items-center justify-center" style={{ 
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.color,
                          fontSize: typography.fontSize.helperText,
                          fontWeight: typography.fontWeight.medium,
                          borderRadius: borderRadius.full
                        }}>
                          <span className={`w-2 h-2 ${statusBadge.dotColor} rounded-full mr-2`}></span>
                          {statusBadge.text === 'Rejected' ? 'Resetted' : statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateApplicationStatus(application.id, 'accepted')}
                            className="px-3 py-2 text-white text-sm font-medium shadow-sm hover:shadow transition-all" 
                            style={{ 
                              backgroundColor: '#10b981',
                              borderRadius: borderRadius.md,
                              fontSize: typography.fontSize.buttonText,
                            }}
                            disabled={application.status === 'accepted'}
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => updateApplicationStatus(application.id, 'waitlisted')}
                            className="px-3 py-2 text-white text-sm font-medium shadow-sm hover:shadow transition-all" 
                            style={{ 
                              backgroundColor: '#f59e0b',
                              borderRadius: borderRadius.md,
                              fontSize: typography.fontSize.buttonText,
                            }}
                            disabled={application.status === 'waitlisted'}
                          >
                            Waitlist
                          </button>
                          {/* <button 
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            className="p-1 text-white text-sm font-medium shadow-sm hover:shadow transition-all" 
                            style={{ 
                              backgroundColor: '#ef4444',
                              borderRadius: borderRadius.md,
                              fontSize: typography.fontSize.buttonText,
                            }}
                            disabled={application.status === 'rejected'}
                          >
                            Reset
                          </button> */}
                          <button 
                            onClick={() => router.push(`/applications/${application.id}`)}
                            className="px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm font-medium shadow-sm flex items-center gap-1 transition-all" 
                            style={{ 
                              borderRadius: borderRadius.md,
                              fontSize: typography.fontSize.buttonText,
                            }}
                          >
                            <Eye size={14} />
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
