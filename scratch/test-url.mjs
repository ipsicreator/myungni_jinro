import https from 'https';

function checkUrl(url) {
  https.get(url, (res) => {
    console.log(`${url} -> HTTP ${res.statusCode}`);
  }).on('error', (e) => {
    console.log(`${url} -> ERROR: ${e.message}`);
  });
}

checkUrl('https://myungni-next-pb.fly.dev/api/health');
checkUrl('https://myungni-next.fly.dev/api/health');
checkUrl('https://suprima-platform-pb.fly.dev/api/health');
