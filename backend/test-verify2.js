const http = require('http');

async function testFootprint() {
  console.log("=== Testing POST /api/footprint ===");
  const payload = JSON.stringify({
    electricity: 100,
    naturalGas: 10,
    water: 1000,
    householdSize: 2,
    heatingFuel: "oil"
  });

  return new Promise((resolve) => {
    const req = http.request('http://localhost:3000/api/footprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log(JSON.stringify(JSON.parse(data), null, 2));
        resolve();
      });
    });
    req.on('error', (e) => console.error(`Problem with request: ${e.message}`));
    req.write(payload);
    req.end();
  });
}

async function testDailyTip() {
  console.log("\n=== Testing GET /api/daily-tip ===");
  return new Promise((resolve) => {
    const req = http.request('http://localhost:3000/api/daily-tip', {
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        console.log(JSON.stringify(JSON.parse(data), null, 2));
        resolve();
      });
    });
    req.on('error', (e) => console.error(`Problem with request: ${e.message}`));
    req.end();
  });
}

async function run() {
  await testFootprint();
  await testDailyTip();
  await testDailyTip(); // Call twice to test cache
}

run();
