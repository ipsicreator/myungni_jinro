// myungni_check.mjs
// Simple health check for Myungni Next API endpoints
const base = 'http://localhost:3000';

async function check() {
  console.log('=== Myungni Next API Health Check ===');
  try {
    const health = await fetch(base + '/api/health');
    const h = await health.json();
    console.log('[SERVER] Health:', h);
  } catch (e) {
    console.log('[SERVER] Unreachable:', e.message);
  }

  // Report-sync GET
  try {
    const r = await fetch(base + '/api/report-sync?limit=1');
    if (r.ok) {
      const j = await r.json();
      console.log('[REPORT_SYNC GET] OK, count:', j.count);
    } else {
      console.log('[REPORT_SYNC GET] FAIL status', r.status);
    }
  } catch (e) {
    console.log('[REPORT_SYNC GET] ERR', e.message);
  }

  // Consultation POST test (minimal payload)
  try {
    const payload = {
      reportId: 'test-report',
      parentName: '테스트학부모',
      phone: '010-1111-2222',
      question: '테스트 문의',
      preferredDate: new Date().toISOString()
    };
    const r = await fetch(base + '/api/consultation/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    console.log('[CONSULTATION POST] status', r.status, 'response', j);
  } catch (e) {
    console.log('[CONSULTATION POST] ERR', e.message);
  }
}

check();
