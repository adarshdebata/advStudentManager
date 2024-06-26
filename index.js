const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
dotenv.config();
// routes import -----
const attendanceRoutes = require('./routes/attendanceRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const { isAuthenticated } = require('./middlewares/AuthMiddleware.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

// Routes
app.use('/', attendanceRoutes);
app.use('/student', isAuthenticated, studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});