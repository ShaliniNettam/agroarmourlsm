async function testLoginCrash() {
  const url = 'http://localhost:8083/api/auth/login';
  const payload = {
    phone: 'deepthi@gmail.com',
    email: 'deepthi@gmail.com',
    password: 'somepassword'
  };

  try {
    console.log('🚀 Sending login request...');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`📡 Status: ${response.status}`);
    const text = await response.text();
    console.log(`📄 Response Body: "${text}"`);

    try {
      const json = JSON.parse(text);
      console.log('✅ Valid JSON response');
    } catch (e) {
      console.error('❌ Failed to parse JSON:', e.message);
    }
  } catch (error) {
    console.error('💥 Request failed:', error.message);
  }
}

testLoginCrash();
