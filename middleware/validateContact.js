// middleware/validateContact.js
// Server-side validation using express-validator

const { body, validationResult } = require('express-validator');

/**
 * Validation rules for the contact form.
 * Each rule targets a specific field and returns a descriptive error message.
 */
const contactValidationRules = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ min: 2, max: 60 }).withMessage('Name must be between 2 and 60 characters.')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name may only contain letters, spaces, hyphens, or apostrophes.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required.')
    .isEmail().withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage('Please enter a valid phone number (e.g. 9876543210 or +91-98765-43210).'),

  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required.')
    .isLength({ min: 3, max: 100 }).withMessage('Subject must be between 3 and 100 characters.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters.'),
];

/**
 * Middleware that runs after validation rules.
 * Collects errors and either passes control forward or
 * re-renders the form with error details.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Map errors into a simple { field: message } object for the EJS template
    const fieldErrors = {};
    errors.array().forEach(err => {
      if (!fieldErrors[err.path]) {
        fieldErrors[err.path] = err.msg;
      }
    });

    return res.status(422).render('index', {
      page: 'contact',
      errors: fieldErrors,
      // Re-populate the form with what the user typed
      formData: {
        fullName: req.body.fullName || '',
        email: req.body.email || '',
        phone: req.body.phone || '',
        subject: req.body.subject || '',
        message: req.body.message || '',
      },
      success: null,
    });
  }

  next();
};

module.exports = { contactValidationRules, handleValidationErrors };
