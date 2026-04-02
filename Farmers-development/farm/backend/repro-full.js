async function testRegisterAndLogin() {
  const registerUrl = 'http://localhost:5002/api/auth/register';
  const loginUrl = 'http://localhost:5002/api/auth/login';
  
  const payload = {
    phone: 'Deepthi.nettam@gmail.com',
    email: 'Deepthi.NETTAM@GMAIL.COM',
    password: 'somepassword',
    name: 'Deepthi Nettam'
  };

  try {
    console.log('🚀 Attempting registration...');
    const regRes = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`📡 Registration Status: ${regRes.status}`);
    const regText = await regRes.text();
    console.log(`📄 Registration Response: "${regText}"`);

    console.log('\n🚀 Attempting login...');
    const loginRes = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: payload.phone,
        email: payload.email,
        password: payload.password
      })
    });

    console.log(`📡 Login Status: ${loginRes.status}`);
    const loginText = await loginRes.text();
    console.log(`📄 Login Response: "${loginText}"`);

    try {
      JSON.parse(loginText);
      console.log('✅ Login JSON is valid');
    } catch (e) {
      console.error('❌ Login JSON parsing failed:', e.message);
    }

  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

testRegisterAndLogin();
