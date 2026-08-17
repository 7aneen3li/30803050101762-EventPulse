require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/user.model');
const Category = require('./models/category.model');
const Event = require('./models/event.model');
const Registration = require('./models/registration.model');
const Message = require('./models/message.model');

const seed = async () => {
    try {
        await connectDB();

        await Message.deleteMany();
        await Registration.deleteMany();
        await Event.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        const hashedPassword = await bcrypt.hash('Admin@123', 12);
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@eventpulse.com',
            password: hashedPassword,
            role: 'admin'
        });

        const categories = await Category.insertMany([
            {
                name: 'Music',
                description: 'Concerts, gigs, and live performances.'
            },
            {
                name: 'Tech',
                descrition: 'Conferences, hackathons, and meetups'
            },
            {
                name: 'Sports',
                description: 'Tournaments, athletic events'
            }
        ]);

        await Event.insertMany([
            {
                title: 'Summer Music Festival',
                description: 'A weekend of live music from top artists',
                category: categories[0]._id,
                date: new Date('2026-07-15'),
                city: 'Cairo',
                venue: 'Cairo Arena',
                capacity: 5000,
                organizer: admin._id
            },
            {
                title: 'DevConf 2026',
                description: 'Annual developer conference on backend architecture',
                category: categories[1]._id,
                date: new Date('2026-09-10'),
                city: 'Giza',
                venue: 'Giza Convention Center',
                capacity: 300,
                organizer: admin._id
            },
            {
                title: 'City Marathon',
                description: 'Annual 10K and full marathon through downtown',
                category: categories[2]._id,
                date: new Date('2026-11-01'),
                city: 'Alexandria',
                venue: 'Alexandria Coeniche',
                capacity: 1000,
                organizer: admin._id
            },
            {
                title: 'AI Hackathon',
                description: '24-hour hackathon focused on AI projects',
                category: categories[1]._id,
                date: new Date('2026-10-05'),
                city: 'Cairo',
                venue: 'Tech Hub Cairo',
                capacity: 150,
                organizer: admin._id
            }
        ]);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed: ', err);
        process.exit(1);
    }
};

seed();