import fs from 'node:fs';
import path from 'node:path';

function getEnvFromFile(key) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return '';
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  const target = lines.find((line) => line.startsWith(`${key}=`));
  return target ? target.slice(key.length + 1).trim() : '';
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || getEnvFromFile('NEXT_PUBLIC_SUPABASE_URL');
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  getEnvFromFile('NEXT_PUBLIC_SUPABASE_ANON_KEY');

async function run() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log(
      JSON.stringify(
        {
          ok: false,
          reason: 'missing_env',
          detail: 'Supabase URL or key is missing.',
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/report_records?select=report_id,student_key&limit=1`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  const text = await res.text();
  if (!res.ok) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }
    console.log(
      JSON.stringify(
        {
          ok: false,
          status: res.status,
          reason: parsed?.message || 'request_failed',
          detail: parsed,
          setupSql: 'supabase/report_records.sql',
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  let rows;
  try {
    rows = JSON.parse(text);
  } catch {
    rows = [];
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        status: res.status,
        rowCount: Array.isArray(rows) ? rows.length : 0,
      },
      null,
      2
    )
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
