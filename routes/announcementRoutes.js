const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const {
    createAnnouncement,
    getAnnouncements,
} = require('../controllers/announcementController');

router.post('/', requireAuth, requireRole('admin'), createAnnouncement);
router.get('/:eventId', getAnnouncements);

module.exports = router;