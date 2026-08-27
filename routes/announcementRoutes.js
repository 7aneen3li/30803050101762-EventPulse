const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const {
    createAnnouncement,
    getAnnouncements,
} = require('../controllers/announcementController');
const createAnnouncementValidation = [
    body('eventId').isMongoId().withMessage('Event ID must be valid'),
    body('text').notEmpty().withMessage('Announcement text is required'),
];

router.post('/', requireAuth, requireRole('admin'), createAnnouncementValidation, validate, createAnnouncement);
router.get('/:eventId', getAnnouncements);

module.exports = router;