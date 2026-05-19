// scripts/check_prod_db_pocketbase.mjs
// Fly.io PocketBase 라이브 데이터베이스 및 API 작동 상태 점검

const POCKETBASE_URL = 'https://suprima-platform-pb.fly.dev';

async function run() {
  console.log('=== Fly.io PocketBase API Live Connection Check ===');
  console.log(`Target: ${POCKETBASE_URL}`);
  console.log('');

  const results = {
    server: false,
    report_records: false,
    consultation_requests: false,
  };

  // 1. 서버 기본 Health API 확인
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/health`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[OK] Server Health Check: ${JSON.stringify(data)}`);
      results.server = true;
    } else {
      console.log(`[FAIL] Server Health status: ${res.status}`);
    }
  } catch (e) {
    console.log(`[ERR] Server Health connection failed: ${e.message}`);
  }

  // 2. report_records 컬렉션 API 검증
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/myungni_next_report_records/records?perPage=1`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[OK] myungni_next_report_records - Total Items: ${data.totalItems}`);
      results.report_records = true;
    } else {
      console.log(`[FAIL] report_records API status: ${res.status}`);
    }
  } catch (e) {
    console.log(`[ERR] report_records connection failed: ${e.message}`);
  }

  // 3. consultation_requests 컬렉션 API 검증
  try {
    const res = await fetch(`${POCKETBASE_URL}/api/collections/myungni_next_consultation_requests/records?perPage=1`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[OK] myungni_next_consultation_requests - Total Items: ${data.totalItems}`);
      results.consultation_requests = true;
    } else {
      console.log(`[FAIL] consultation_requests API status: ${res.status}`);
    }
  } catch (e) {
    console.log(`[ERR] consultation_requests connection failed: ${e.message}`);
  }

  console.log('');
  console.log('=== Final Health Result ===');
  if (results.server && results.report_records && results.consultation_requests) {
    console.log('STATUS: [PASS] - 24/7 Cloud API Integration is fully operational.');
  } else {
    console.log('STATUS: [FAIL] - Please check PocketBase instance or network.');
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Check script crashed:', err);
  process.exit(1);
});
