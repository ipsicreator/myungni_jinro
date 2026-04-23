import { NextResponse } from 'next/server';

// This API route mimics the logic in 2ndapp.py for handling consultation requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reportId, parentName, phone, question, preferredDate } = body;

    // In a real implementation with Supabase:
    /*
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([
        { 
          report_id: reportId, 
          parent_name: parentName, 
          phone, 
          question, 
          preferred_date: preferredDate 
        }
      ]);
    */

    console.log("Saving Consultation Request to DB:", {
      reportId,
      parentName,
      phone,
      question,
      preferredDate,
      status: 'pending',
      ai_analysis_status: 'queued' // Mimicking the 2ndapp.py AI trigger
    });

    return NextResponse.json({ success: true, message: "신청이 완료되었습니다." });
  } catch (error) {
    console.error("Error in consultation apply API:", error);
    return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
