const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const createEventValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').isMongoId().withMessage('Category must be a valid ID'),
    body('date').isISO8601().withMessage('Date must be a valid date').toDate(),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
];
const updateEventValidation = [
    param('id').isMongoId().withMessage('Invalid event ID'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('category').optional().isMongoId().withMessage('Category must be a valid ID'),
    body('date').optional().isISO8601().withMessage('Date must be a valid date').toDate(),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
];

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', requireAuth, requireRole('admin'), createEventValidation, validate, createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), updateEventValidation, validate, updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);

module.exports = router;