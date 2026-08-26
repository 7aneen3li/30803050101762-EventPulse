const Event = require('../models/event.model');
const Message = require('../models/message.model');
require('../models/user.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.createAnnouncement = asyncHandler(async (req, res, next) => {
    const { eventId, text } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
        return next(new AppError('Event not Found', 404));
    }

    const message = await Message.create({
        event: eventId,
        sender: req.user.userId,
        text,
    });

    const io = req.app.get('io');
    io.to(eventId).emit('announcement', message);

    res.status(201).json({ status: 'success', data: message });
});

exports.getAnnouncements = asyncHandler(async (req, res, next) => {
    const { eventId } = req.params;

    const messages = await Message.find({ event: eventId })
        .populate('sender')
        .sort({ createdAt: 1 });

    res.status(200).json({ status: 'success', data: messages });
});