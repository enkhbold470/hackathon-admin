'use client';

import { useEffect, useState } from 'react';

interface ApplicantStats {
  totalApplicants: number;
  skillLevelDistribution: { [key: string]: number };
  hackathonExperienceRange: { [key: string]: number };
  tShirtSizeDistribution: { [key: string]: number };
  selfDescriptionWordFrequency: { [key: string]: number };
  funFactsWordFrequency: { [key: string]: number };
  projectInterestThemes: { [key: string]: number };
  referralSourceDistribution: { [key: string]: number };
  applicationSubmissionCountsByDate: { [key: string]: number };
  applicationStatusDistribution: { [key: string]: number };
  teammateStats: { applicantsWithTeammates: number; totalTeammatesListed: string };
  dietaryRestrictionCounts: { [key: string]: number };
  linksProvidedCounts: { [key: string]: number };
  message?: string; // Optional message from API
}

export default function StatsPage() {
  const [statsData, setStatsData] = useState<ApplicantStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error(`Error fetching stats: ${response.status} ${response.statusText}`);
        }
        const data: ApplicantStats = await response.json();
        setStatsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!statsData) {
    return <p>No data available.</p>;
  }

  const renderObjectStats = (title: string, data: { [key: string]: number | string } | undefined) => {
    if (!data) return <p>Data not available for {title}.</p>;
    return (
      <div>
        <h2>{title}</h2>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>{key}: {String(value)}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Hackathon Application Statistics</h1>

      <div>
        <h2>Total Applicants</h2>
        <p>{statsData.totalApplicants}</p>
      </div>

      {renderObjectStats("Skill Level Distribution", statsData.skillLevelDistribution)}
      {renderObjectStats("Hackathon Experience Range", statsData.hackathonExperienceRange)}
      {renderObjectStats("T-Shirt Size Distribution", statsData.tShirtSizeDistribution)}
      
      <div>
        <h2>Self Description Word Frequency (Top words)</h2>
        <ul>
          {statsData.selfDescriptionWordFrequency && Object.entries(statsData.selfDescriptionWordFrequency)
            .sort(([, a], [, b]) => b - a) // Sort by frequency desc
            .slice(0, 15) // Take top 15
            .map(([word, count]) => (
              <li key={word}>{word}: {count}</li>
            ))}
        </ul>
      </div>

      <div>
        <h2>Fun Facts Word Frequency (Top words)</h2>
        <ul>
          {statsData.funFactsWordFrequency && Object.entries(statsData.funFactsWordFrequency)
            .sort(([, a], [, b]) => b - a) // Sort by frequency desc
            .slice(0, 15) // Take top 15
            .map(([word, count]) => (
              <li key={word}>{word}: {count}</li>
            ))}
        </ul>
      </div>
      
      {renderObjectStats("Project Interest Themes", statsData.projectInterestThemes)}
      {renderObjectStats("Referral Source Distribution", statsData.referralSourceDistribution)}
      {renderObjectStats("Application Submission Counts by Date", statsData.applicationSubmissionCountsByDate)}
      {renderObjectStats("Application Status Distribution", statsData.applicationStatusDistribution)}
      
      <div>
        <h2>Teammate Stats</h2>
        {statsData.teammateStats ? (
          <ul>
            <li>Applicants with Teammates: {statsData.teammateStats.applicantsWithTeammates}</li>
            <li>Total Teammates Listed: {statsData.teammateStats.totalTeammatesListed}</li>
          </ul>
        ) : <p>Data not available.</p>}
      </div>

      {renderObjectStats("Dietary Restriction Counts", statsData.dietaryRestrictionCounts)}
      {renderObjectStats("Links Provided Counts", statsData.linksProvidedCounts)}

    </div>
  );
}
