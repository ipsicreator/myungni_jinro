import http from 'http';

const intake = {
  name: '홍길동',
  school: '서울중학교',
  grade: '중3',
  studentPhone: '010-1234-5678',
  parentPhone: '010-9876-5432',
  birthDate: '2010.05.15',
  birthTime: '14:30',
  calendarType: 'solar',
  gender: 'male',
};

// Generate realistic dummy survey answers
const abc = {};
const learning = {};
const engineering = {};
for (let i = 1; i <= 32; i++) abc[`abc_${i}`] = (i % 5) + 1;
for (let i = 1; i <= 44; i++) learning[`ils_${i}`] = (i % 2) === 0 ? 'a' : 'b';
for (let i = 1; i <= 24; i++) engineering[`eng_${i}`] = (i % 5) + 1;

const answers = { abc, learning, engineering };

const payload = JSON.stringify({
  source: 'ipsi-dna-prism-next-qa-test',
  createdAt: new Date().toISOString(),
  intake,
  answers,
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 3001,
    path: '/api/report-sync',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(`[Report Sync API] Status: ${res.statusCode}`);
      const json = JSON.parse(data);
      console.log('[Report Sync API] OK:', json.ok);
      console.log('[Report Sync API] Persistence:', json.persistence);
      if (json.warning) console.log('[Report Sync API] Warning:', json.warning);
      
      if (json.ok && json.stored && json.stored.reportId) {
        console.log(`[Report Sync API] Report ID Generated: ${json.stored.reportId}`);
        console.log(`[Report Sync API] DB Storage Success!`);
        testConsultation(json.stored.reportId);
      } else {
        console.error('[Report Sync API] Failed to store report', json);
      }
    });
  }
);

req.on('error', (e) => {
  console.error(`[Report Sync API] Problem with request: ${e.message}`);
});

req.write(payload);
req.end();

function testConsultation(reportId) {
  const consultPayload = JSON.stringify({
    reportId,
    parentName: '홍판서',
    phone: '010-9876-5432',
    question: '실제 데이터를 넣은 QA 테스트 문의입니다.',
    preferredDate: '2026.05.20 14:00',
  });

  const consultReq = http.request(
    {
      hostname: 'localhost',
      port: 3001,
      path: '/api/consultation/apply',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(consultPayload),
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`\n[Consultation API] Status: ${res.statusCode}`);
        const json = JSON.parse(data);
        console.log('[Consultation API] Success:', json.success);
        console.log('[Consultation API] Persistence:', json.persistence);
        if (json.warning) console.log('[Consultation API] Warning:', json.warning);
      });
    }
  );

  consultReq.on('error', (e) => {
    console.error(`[Consultation API] Problem with request: ${e.message}`);
  });

  consultReq.write(consultPayload);
  consultReq.end();
}
