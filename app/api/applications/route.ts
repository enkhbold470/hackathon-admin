import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all applications
export async function GET(request: NextRequest) {
  try {
    // Get search parameter if any
    const searchQuery = request.nextUrl.searchParams.get('search') || '';
    
    // Define the filter condition based on search query
    const whereCondition = searchQuery
      ? {
          OR: [
            { fullName: { contains: searchQuery, mode: 'insensitive' } },
            { cwid: { contains: searchQuery, mode: 'insensitive' } },
            { userId: { contains: searchQuery, mode: 'insensitive' } },
          ],
        }
      : {};
    
    // Fetch applications with filter if search is provided
    const applications = await prisma.application.findMany({
      where: whereCondition as any,
      orderBy: { updatedAt: 'desc' },
    });
    
    return NextResponse.json({ 
      success: true, 
      applications 
    });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}

// Update application status
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status value
    const validStatuses = ['accepted', 'waitlisted', 'rejected', 'submitted', 'confirmed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update the application
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { 
        status,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      application: updatedApplication 
    });
  } catch (error: any) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
} 