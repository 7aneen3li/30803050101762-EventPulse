require('dotenv').config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const initSocket = require('./config/socket');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
const httpServer = http.createServer(app);
const io = initSocket(httpServer);

app.set('io', io);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);

app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

app.use(errorHandler);

async function start() {
  await connectDB();
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

start();