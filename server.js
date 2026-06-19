// server.js
// Entry point – Express app wired to EJS views

const express = require('express');
const path    = require('path');
const {
  contactValidationRules,
  handleValidationErrors,
} = require('./middleware/validateContact');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ─────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Static Assets ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Body Parsers ────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

// GET / → render home page
app.get('/', (req, res) => {
  res.render('index', {
    page: 'home',
    errors: {},
    formData: {},
    success: null,
  });
});

// GET /contact → render contact form (clean state)
app.get('/contact', (req, res) => {
  res.render('index', {
    page: 'contact',
    errors: {},
    formData: {},
    success: null,
  });
});

// POST /contact → server-side validation → process submission
app.post(
  '/contact',
  contactValidationRules,       // Step 1: run validation rules
  handleValidationErrors,        // Step 2: intercept errors → re-render
  (req, res) => {                // Step 3: all clear → handle success
    const { fullName, email, phone, subject, message } = req.body;

    // In a real app this is where you'd save to DB / send email.
    console.log('✅ New contact submission:', { fullName, email, phone, subject, message });

    res.render('index', {
      page: 'contact',
      errors: {},
      formData: {},
      success: {
        name: fullName,
        email,
      },
    });
  }
);

// GET /about → simple about page
app.get('/about', (req, res) => {
  res.render('index', {
    page: 'about',
    errors: {},
    formData: {},
    success: null,
  });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).render('index', {
    page: '404',
    errors: {},
    formData: {},
    success: null,
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Cognifyz L1-T1 server running → http://localhost:${PORT}`);
});
