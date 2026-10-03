const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Demo "database" — in a real app this is a proper DB storing only the hash.
const demoUser = { email: 'user@example.com', passwordHash: null };

bcrypt.hash('Sup3rSecret!', 12).then((hash) => {
  demoUser.passwordHash = hash;
  console.log('Demo user ready: user@example.com / Sup3rSecret!');
});

function isValidEmail(email) {
  return typeof email === 'string' && email.includes('@') && email.length <= 254;
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  // Server-side validation — the client-side checks can always be bypassed
  // (disabled JS, curl, Burp, etc.), so this is the real gate.
  if (!isValidEmail(email) || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ success: false, message: 'Invalid email or password format.' });
  }

  if (email !== demoUser.email) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const match = await bcrypt.compare(password, demoUser.passwordHash);
  if (!match) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
