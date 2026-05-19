const PB_URL = 'https://suprima-platform-pb.fly.dev';
const ADMIN_EMAIL = 'chrisklee69@gmail.com';
const ADMIN_PASSWORD = 'aussie1996@@';

async function createCollections() {
  console.log('Authenticating as admin...');
  const authRes = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });

  if (!authRes.ok) {
    const text = await authRes.text();
    console.error('Authentication failed:', text);
    process.exit(1);
  }

  const authData = await authRes.json();
  const token = authData.token;
  console.log('Authentication successful.');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Create myungni_next_report_records
  const reportsCollection = {
    name: 'myungni_next_report_records',
    type: 'base',
    schema: [
      { name: 'report_id', type: 'text', required: false },
      { name: 'student_key', type: 'text', required: false },
      { name: 'student_name', type: 'text', required: false },
      { name: 'school', type: 'text', required: false },
      { name: 'grade', type: 'text', required: false },
      { name: 'source', type: 'text', required: false },
      { name: 'createdAt', type: 'text', required: false },
      { name: 'headline', type: 'text', required: false },
      { name: 'report_json', type: 'json', required: false, options: { maxSize: 2000000 } },
      { name: 'answers_json', type: 'json', required: false, options: { maxSize: 2000000 } }
    ],
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: ''
  };

  console.log('Creating myungni_next_report_records...');
  const createReportRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST',
    headers,
    body: JSON.stringify(reportsCollection)
  });

  if (createReportRes.ok) {
    console.log('✅ myungni_next_report_records created successfully!');
  } else {
    const text = await createReportRes.text();
    console.error('Failed to create report collection:', text);
  }

  // Create myungni_next_consultation_requests
  const consultationCollection = {
    name: 'myungni_next_consultation_requests',
    type: 'base',
    schema: [
      { name: 'report_id', type: 'text', required: false },
      { name: 'parent_name', type: 'text', required: false },
      { name: 'phone', type: 'text', required: false },
      { name: 'question', type: 'text', required: false },
      { name: 'preferred_date', type: 'text', required: false },
      { name: 'status', type: 'text', required: false }
    ],
    listRule: '',
    viewRule: '',
    createRule: '',
    updateRule: '',
    deleteRule: ''
  };

  console.log('Creating myungni_next_consultation_requests...');
  const createConsultRes = await fetch(`${PB_URL}/api/collections`, {
    method: 'POST',
    headers,
    body: JSON.stringify(consultationCollection)
  });

  if (createConsultRes.ok) {
    console.log('✅ myungni_next_consultation_requests created successfully!');
  } else {
    const text = await createConsultRes.text();
    console.error('Failed to create consultation collection:', text);
  }
}

createCollections().catch(console.error);
