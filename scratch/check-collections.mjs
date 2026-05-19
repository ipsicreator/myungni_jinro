// Check all PocketBase collections for both Suprema Platform and Myungni Next
const base = 'https://suprima-platform-pb.fly.dev';

const collections = [
  // Myungni Next collections
  'myungni_next_report_records',
  'myungni_next_consultation_requests',
  // Suprema Platform collections (from TECHNICAL_REPORT.md)
  'licenses',
  'profiles',
  'students',
  'pdf_analyses',
  'diagnosis_sessions',
  'setuk_history',
  'exploration_results',
  'prism_assessments',
];

async function check() {
  console.log('=== Fly.io PocketBase Collection Health Check ===');
  console.log('Target: ' + base);
  console.log('');

  // 1. Server health
  try {
    const health = await fetch(base + '/api/health');
    const hj = await health.json();
    console.log('[SERVER] Health:', JSON.stringify(hj));
  } catch (e) {
    console.log('[SERVER] UNREACHABLE:', e.message);
    return;
  }

  console.log('');
  console.log('--- Collection Status ---');

  for (const c of collections) {
    try {
      const r = await fetch(base + '/api/collections/' + c + '/records?perPage=1');
      if (r.ok) {
        const j = await r.json();
        console.log('[OK]   ' + c.padEnd(42) + ' totalItems=' + j.totalItems);
      } else {
        const t = await r.text();
        console.log('[FAIL] ' + c.padEnd(42) + ' status=' + r.status + ' msg=' + t.substring(0, 100));
      }
    } catch (e) {
      console.log('[ERR]  ' + c.padEnd(42) + ' ' + e.message);
    }
  }
}

check();
