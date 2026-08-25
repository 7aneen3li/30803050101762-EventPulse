const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration,
} = require('../controllers/registrationController');

router.post('/', requireAuth, registerForEvent);
router.get('/my', requireAuth, getMyRegistrations);
router.delete('/:id', requireAuth, cancelRegistration);

module.exports = router;