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

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events returned successfully
 *       500:
 *         description: Server error
 */
router.get('/', getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Get an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event returned successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags: [Events]
 *     summary: Create a new event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-15T10:00:00.000Z
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, requireRole('admin'), createEventValidation, validate, createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     tags: [Events]
 *     summary: Update an event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Tech Conference
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-20T10:00:00.000Z
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 150
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', requireAuth, requireRole('admin'), updateEventValidation, validate, updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete an event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, requireRole('admin'), deleteEvent);

module.exports = router;