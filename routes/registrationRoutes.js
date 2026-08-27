const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const validate = require('../middleware/validate');
const {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration,
} = require('../controllers/registrationController');
const registerForEventValidation = [
    body('event').isMongoId().withMessage('Event ID must be valid'),
];

router.post('/', requireAuth, registerForEventValidation, validate, registerForEvent);
router.get('/my', requireAuth, getMyRegistrations);
router.delete('/:id', requireAuth, cancelRegistration);

module.exports = router;