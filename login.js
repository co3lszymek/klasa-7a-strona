const backendUrl = 'https://klasa7a-api.onrender.com/'; // <-- ZMIEŃ NA SWÓJ BACKEND

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  try {
    const res = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = 'green';
      message.textContent = 'Zalogowano!';
      localStorage.setItem('adminToken', data.token);
      setTimeout(() => {
        window.location.href = 'admin.html';
      }, 1000);
    } else {
      message.style.color = 'red';
      message.textContent = data.error || 'Błąd logowania';
    }
  } catch (err) {
    message.style.color = 'red';
    message.textContent = 'Błąd połączenia z serwerem';
  }
});
