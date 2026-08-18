const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const requireAuth = require('../middleware/requireAuth');

router.post('/register', register);
router.post('/login', login);

router.get('/me', requireAuth, (req, res) => {
    res.status(200).json({ status: 'success', data: req.user });
});

module.exports = router;