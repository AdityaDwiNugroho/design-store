import { NextRequest, NextResponse } from 'next/server';
import { exportSubscribersCSV, getSubscriberStats } from '@/lib/newsletter-db';

// Export subscribers as CSV
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    
    if (format === 'csv') {
      const csvData = exportSubscribersCSV();
      
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="newsletter_subscribers.csv"',
        },
      });
    }
    
    if (format === 'stats') {
      const stats = getSubscriberStats();
      return NextResponse.json(stats);
    }
    
    return NextResponse.json(
      { error: 'Invalid format. Use ?format=csv or ?format=stats' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
