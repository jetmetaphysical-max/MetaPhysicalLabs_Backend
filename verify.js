// verify.js
const API_URL = 'http://localhost:3001';

async function checkHealth() {
    try {
        const res = await fetch(`${API_URL}/health`);
        const data = await res.json();
        console.log('Health Check:', res.status === 200 ? 'PASS' : 'FAIL', data);
        return res.status === 200;
    } catch (e) {
        console.error('Health Check Error:', e.message);
        return false;
    }
}

async function run() {
    console.log('Running Verification...');
    if (await checkHealth()) {
        console.log('Server is UP and READY.');
    } else {
        console.log('Server verification FAILED.');
        process.exit(1);
    }
}

run();
