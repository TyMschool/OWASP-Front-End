document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageEl = document.getElementById('message');

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  messageEl.textContent = '';
  messageEl.className = '';

  // --- Client-side validation (fast feedback only — never trusted on its own) ---
  if (!email || !password) {
    return showError('Email and password are both required.');
  }
  if (!email.includes('@')) {
    return showError('Please enter a valid email address.');
  }
  if (password.length < 8) {
    return showError('Password must be at least 8 characters.');
  }

  // --- Server-side validation is the authoritative check ---
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // textContent (not innerHTML) so a malicious email/password value
        // can never be executed as HTML/JS in the page.
        showSuccess('Welcome back, ' + email);
      } else {
        showError(data.message || 'Login failed.');
      }
    })
    .catch(() => showError('Could not reach the server. Is server.js running?'));

  function showError(msg) {
    messageEl.textContent = msg;
    messageEl.className = 'error';
  }
  function showSuccess(msg) {
    messageEl.textContent = msg;
    messageEl.className = 'success';
  }
});
