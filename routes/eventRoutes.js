const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', requireAuth, requireRole('admin'), createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);

module.exports = router;