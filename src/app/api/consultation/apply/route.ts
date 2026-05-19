import { NextResponse } from 'next/server';
import { getStoreMode, pocketbaseRequest } from '@/lib/reportStore';

// This API route handles consultation requests and persists them to PocketBase on Fly.io
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reportId, parentName, phone, question, preferredDate } = body;

    // If active storage mode is cloud ('supabase'), write to PocketBase
    if (getStoreMode() === 'supabase') {
      const payload = {
        report_id: reportId || 'transient-unknown',
        parent_name: parentName || '학부모',
        phone: phone || '010-0000-0000',
        question: question || '상담을 신청합니다.',
        preferred_date: preferredDate ? new Date(preferredDate).toISOString() : new Date().toISOString(),
        status: 'pending',
      };

      await pocketbaseRequest('collections/myungni_next_consultation_requests/records', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

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
