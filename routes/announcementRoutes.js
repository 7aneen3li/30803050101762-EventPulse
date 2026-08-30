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

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Event announcement endpoints
 */

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     tags: [Announcements]
 *     summary: Create an announcement
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - text
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: Event ID
 *                 example: 507f1f77bcf86cd799439011
 *               text:
 *                 type: string
 *                 description: Announcement text
 *                 example: The event starts at 10 AM.
 *     responses:
 *       201:
 *         description: Announcement created successfully
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
router.post('/', requireAuth, requireRole('admin'), createAnnouncementValidation, validate, createAnnouncement);

/**
 * @swagger
 * /api/announcements/{eventId}:
 *   get:
 *     tags: [Announcements]
 *     summary: Get announcements for an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Announcements returned successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/:eventId', getAnnouncements);

module.exports = router;