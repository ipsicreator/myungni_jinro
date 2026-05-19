const PB_URL = 'https://suprima-platform-pb.fly.dev';
const ADMIN_EMAIL = 'chrisklee69@gmail.com';
const ADMIN_PASSWORD = 'aussie1996@@';

async function listCollections() {
  const authRes = await fetch(`${PB_URL}/api/admins/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD })
  });

  if (!authRes.ok) {
    console.error('Authentication failed');
    return;
  }

  const { token } = await authRes.json();

  const collectionsRes = await fetch(`${PB_URL}/api/collections?perPage=50`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await collectionsRes.json();
  const names = data.items.map(c => c.name);
  console.log('--- Collections currently on server ---');
  console.log(names.join('\n'));
}

listCollections().catch(console.error);
