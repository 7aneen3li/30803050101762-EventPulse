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

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Event registration endpoints
 */

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     tags: [Registrations]
 *     summary: Register for an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *             properties:
 *               event:
 *                 type: string
 *                 description: Event ID
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Successfully registered for event
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Event not found
 *       409:
 *         description: Already registered
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, registerForEventValidation, validate, registerForEvent);

/**
 * @swagger
 * /api/registrations/my:
 *   get:
 *     tags: [Registrations]
 *     summary: Get current user's registrations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User registrations returned successfully
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Server error
 */
router.get('/my', requireAuth, getMyRegistrations);

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     tags: [Registrations]
 *     summary: Cancel a registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Registration ID
 *     responses:
 *       200:
 *         description: Registration cancelled successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, cancelRegistration);

module.exports = router;