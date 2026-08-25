const Event = require('../models/event.model');
const Registration = require('../models/registration.model');
require('../models/category.model');
require('../models/user.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const ALLOWED_SORT_FIELDS = ['date', 'registrations'];

exports.getEvents = asyncHandler(async (req, res, next) => {
    const { category, city, startDate, endDate, search, page, limit, sortBy, order } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (city) filter.city = city;

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'date';
    const sortDirection = order === 'desc' ? -1 : 1;

    const total = await Event.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    let data;

    if (sortField === 'registrations') {
        const matchedEvents = await Event.find(filter).populate('category');

        const counts = await Registration.aggregate([
            { $match: { event: { $in: matchedEvents.map((e) => e._id) } } },
            { $group: { _id: '$event', count: { $sum: 1 } } },
        ]);

        const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
        data = matchedEvents
            .map((event) => ({
                ...event.toObject(),
                RegistrationsCount: countMap.get(event._id.toString()) || 0,
            }))
            .sort((a, b) => (a.RegistrationsCount - b.RegistrationsCount) * sortDirection)
            .slice(skip, skip + limitNum);
    } else {
        const sort = { [sortField]: sortDirection };

        data = await Event.find(filter)
            .populate('category')
            .sort(sort)
            .skip(skip)
            .limit(limitNum);
    }

    res.status(200).json({
        status: 'success',
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        data,
    });
});

exports.getEventById = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id)
        .populate('category')
        .populate('organizer');

    if (!event) {
        return next(new AppError('Event not Found', 404));
    }

    res.status(200).json({ status: 'success', data: event });
});

exports.createEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.create({ ...req.body, organizer: req.user.userId });
    res.status(201).json({ status: 'success', data: event });
});

exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!event) {
        return next(new AppError('Event not Found', 404));
    }

    res.status(200).json({ status: 'success', data: event });
});

exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
        return next(new AppError('Event not Found', 404));
    }

    res.status(200).json({ status: 'success', data: null });
});