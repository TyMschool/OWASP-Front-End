# Secure Login Form Demo

A small login page built to study OWASP Top 10 concepts (input validation, XSS, password handling) for a web-security assignment inspired by OWASP Juice Shop.

## What it does

- `index.html` / `script.js` — a login form with client-side validation (email must contain `@`, password must be at least 8 characters). Runs entirely in the browser for instant feedback.
- `server.js` — an Express server that re-validates the same rules server-side (the only check that actually matters — client-side JS can always be bypassed) and checks the password with `bcrypt.compare` against a hash, never a plaintext value.

## Validation rules

| Rule | Enforced client-side | Enforced server-side |
|---|---|---|
| Email required, contains `@` | ✅ | ✅ |
| Password required, ≥ 8 characters | ✅ | ✅ |
| Credentials actually correct | — | ✅ |

## Run it locally

```bash
npm install
npm start
```

Then open `http://localhost:3000` in a browser.

Demo credentials: `user@example.com` / `Sup3rSecret!`

## Security notes

- Passwords are hashed with **bcrypt** (cost factor 12) before being stored or compared — plaintext passwords are never kept anywhere.
- The success message is written with `textContent`, not `innerHTML`, so a value like `<script>alert(1)</script>` typed into the email field is rendered as inert text, not executed.
- This is a teaching artifact, not production code: it has no CSRF protection, rate limiting, or persistent database.
