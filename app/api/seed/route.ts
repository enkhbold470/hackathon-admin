import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This is only for development purposes to seed data
export async function POST(request: NextRequest) {
  try {
    // Create sample applications
    const sampleApplications = [
      {
        fullName: 'Jane Doe',
        cwid: '12345678',
        discord: 'jane#1234',
        skillLevel: 'Intermediate',
        hackathonExperience: 'This is my second hackathon',
        hearAboutUs: 'From friends',
        whyAttend: 'I want to improve my skills and meet new people',
        projectExperience: 'I have built several web applications using React and Node.js',
        futurePlans: 'I hope to work as a full-stack developer',
        funFact: 'I can solve a Rubik\'s cube in under 2 minutes',
        selfDescription: 'I am a dedicated student with a passion for coding',
        links: 'github.com/janedoe, linkedin.com/in/janedoe',
        teammates: 'John Smith, Emily Johnson',
        tshirtSize: 'M',
        status: 'submitted',
      },
      {
        fullName: 'John Smith',
        cwid: '87654321',
        discord: 'john#5678',
        skillLevel: 'Beginner',
        hackathonExperience: 'This is my first hackathon',
        hearAboutUs: 'From school',
        whyAttend: 'I want to learn more about programming in a team environment',
        projectExperience: 'I have built a simple website for my portfolio',
        futurePlans: 'I want to learn more programming languages',
        funFact: 'I play three instruments',
        selfDescription: 'I am curious and always eager to learn',
        links: 'github.com/johnsmith',
        teammates: 'Jane Doe',
        tshirtSize: 'L',
        status: 'submitted',
      },
      {
        fullName: 'Emily Johnson',
        cwid: '23456789',
        discord: 'emily#9012',
        skillLevel: 'Advanced',
        hackathonExperience: 'I have participated in five hackathons',
        hearAboutUs: 'From previous hackathon',
        whyAttend: 'I want to challenge myself with a new project',
        projectExperience: 'I have developed mobile apps and web applications',
        futurePlans: 'I hope to start my own tech company someday',
        funFact: 'I have visited 15 countries',
        selfDescription: 'I am a problem-solver who enjoys tackling complex challenges',
        links: 'github.com/emilyjohnson, linkedin.com/in/emilyjohnson',
        teammates: 'Jane Doe',
        tshirtSize: 'S',
        status: 'waitlisted',
      }
    ];
    
    // Batch create the applications
    const createdApplications = await Promise.all(
      sampleApplications.map(app => 
        prisma.application.create({
          data: {
            ...app,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      )
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sample data created successfully',
      applications: createdApplications
    });
  } catch (error: any) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
} 