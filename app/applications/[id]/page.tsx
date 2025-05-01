'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Loader } from 'lucide-react';
import { typography, borderRadius } from '@/lib/ui-config';

interface Application {
  id: number;
  userId: string;
  cwid?: string;
  fullName?: string;
  discord?: string;
  skillLevel?: string;
  hackathonExperience?: string;
  hearAboutUs?: string;
  whyAttend?: string;
  projectExperience?: string;
  futurePlans?: string;
  funFact?: string;
  selfDescription?: string;
  links?: string;
  teammates?: string;
  referralEmail?: string;
  dietaryRestrictionsExtra?: string;
  tshirtSize?: string;
  agreeToTerms: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationDetail({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch the application data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/applications/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Application not found');
          }
          throw new Error('Failed to fetch application details');
        }
        
        const data = await response.json();
        setApplication(data.application);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        // console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApplication();
    }
  }, [params.id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' };
      case 'waitlisted':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Waitlisted' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' };
      case 'confirmed':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Pending' };
    }
  };

  // Update application status
  const updateApplicationStatus = async (status: string) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
      
      // Refresh application data
      const data = await response.json();
      setApplication(data.application);
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
      // console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="animate-spin text-amber-600" size={32} />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/')}
            className="mb-4 flex items-center text-amber-600 hover:text-amber-700"
          >
            <ChevronLeft size={16} />
            <span>Back to Applications</span>
          </button>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
            <p className="text-red-600">{error || 'Application not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(application.status);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push('/')}
          className="mb-4 flex items-center text-amber-600 hover:text-amber-700"
        >
          <ChevronLeft size={16} />
          <span>Back to Applications</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-slate-800 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{application.fullName || 'Unnamed Applicant'}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                {statusBadge.label}
              </span>
            </div>
            <div className="mt-2 text-gray-300">
              Application ID: {application.id} | Submitted: {formatDate(application.createdAt)}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Personal Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Full Name:</span>
                    <p className="text-gray-800">{application.fullName || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">CWID:</span>
                    <p className="text-gray-800">{application.cwid || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">User ID:</span>
                    <p className="text-gray-800">{application.userId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Discord:</span>
                    <p className="text-gray-800">{application.discord || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">T-Shirt Size:</span>
                    <p className="text-gray-800">{application.tshirtSize || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Experience</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Skill Level:</span>
                    <p className="text-gray-800">{application.skillLevel || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Hackathon Experience:</span>
                    <p className="text-gray-800">{application.hackathonExperience || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">How They Heard About Us:</span>
                    <p className="text-gray-800">{application.hearAboutUs || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Application Details</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 text-sm">Why Attend:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.whyAttend || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Project Experience:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.projectExperience || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Self Description:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.selfDescription || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Future Plans:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.futurePlans || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Fun Fact:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.funFact || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Additional Information</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 text-sm">Links:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.links || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Teammates:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.teammates || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Dietary Restrictions:</span>
                    <p className="text-gray-800 mt-1 bg-gray-50 p-3 rounded">{application.dietaryRestrictionsExtra || 'None specified'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => updateApplicationStatus('accepted')}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    application.status === 'accepted' 
                      ? 'bg-green-300 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                  disabled={application.status === 'accepted'}
                >
                  Accept Application
                </button>
                <button 
                  onClick={() => updateApplicationStatus('waitlisted')}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    application.status === 'waitlisted' 
                      ? 'bg-yellow-300 cursor-not-allowed' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                  disabled={application.status === 'waitlisted'}
                >
                  Waitlist Application
                </button>
                <button 
                  onClick={() => updateApplicationStatus('rejected')}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    application.status === 'rejected' 
                      ? 'bg-red-300 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                  disabled={application.status === 'rejected'}
                >
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 