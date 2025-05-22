import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all applications
    const applications = await prisma.application.findMany();
    
    // Calculate statistics
    const stats = {
      // 1. Skill Level Distribution
      skillLevelDistribution: calculateDistribution(applications, 'skillLevel'),
      
      // 2. Hackathon Experience Range
      hackathonExperienceDistribution: calculateDistribution(applications, 'hackathonExperience'),
      
      // 3. T-Shirt Size Distribution
      tshirtSizeDistribution: calculateDistribution(applications, 'tshirtSize'),
      
      // 4. Self-Description Word Frequency
      selfDescriptionWordFrequency: calculateWordFrequency(applications, 'selfDescription', 20),
      
      // 5. How They Heard About DAHacks
      hearAboutUsDistribution: calculateDistribution(applications, 'hearAboutUs'),
      
      // 6. Application Submission Dates
      submissionDates: calculateSubmissionDates(applications),
      
      // 7. Status Distribution
      statusDistribution: calculateDistribution(applications, 'status'),
      
      // 8. Dietary Restriction Count
      dietaryRestrictionsCount: calculateDietaryRestrictions(applications, 'dietaryRestrictionsExtra'),
      
      // Total applications
      totalApplications: applications.length
    };
    
    return NextResponse.json({ 
      success: true, 
      stats 
    });
  } catch (error: any) {
    console.error('Error generating stats:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}

// Helper functions

// Calculate distribution of values for a given field
function calculateDistribution(data: any[], field: string) {
  const distribution: Record<string, number> = {};
  
  data.forEach(item => {
    const value = item[field] || 'N/A';
    distribution[value] = (distribution[value] || 0) + 1;
  });
  
  return distribution;
}

// Calculate word frequency for a text field
function calculateWordFrequency(data: any[], field: string, limit: number = 10) {
  const wordCounts: Record<string, number> = {};
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'i', 'my', 'me', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing']);
  
  data.forEach(item => {
    const text = item[field];
    if (text) {
      const words = text.toLowerCase().split(/\s+/).filter((word: string) => {
        // Remove punctuation and filter out stop words
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        return cleanWord.length > 2 && !stopWords.has(cleanWord);
      });
      
      words.forEach((word: string) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    }
  });
  
  // Convert to array, sort by count, and take top entries
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .reduce((acc, [word, count]) => {
      acc[word] = count;
      return acc;
    }, {} as Record<string, number>);
}

// Calculate submission dates distribution
function calculateSubmissionDates(data: any[]) {
  const dateDistribution: Record<string, number> = {};
  
  data.forEach(item => {
    if (item.createdAt) {
      const date = new Date(item.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
      dateDistribution[date] = (dateDistribution[date] || 0) + 1;
    }
  });
  
  return dateDistribution;
}

// Calculate count of non-empty values for a field
function calculateNonEmptyCount(data: any[], field: string) {
  return data.filter(item => 
    item[field] && item[field].trim() !== ''
  ).length;
} 

function calculateDietaryRestrictions(data: any[], field: string) {

  let nonDietaryRestrictedCount = 0;

  data.forEach(item => {
    const value = item[field] || 'N/A';
    if (value === 'N/A') {
      nonDietaryRestrictedCount++;
    }
  });

  return nonDietaryRestrictedCount;
}