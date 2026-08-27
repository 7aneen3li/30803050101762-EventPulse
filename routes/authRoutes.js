const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');
const validate = require('../middleware/validate');
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, validate, register);
router.post('/login',loginValidation, validate, login);

router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ status: 'success', data: req.user });
});

module.exports = router;