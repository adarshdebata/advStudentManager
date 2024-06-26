const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const attendanceRoutes = require('./routes/attendanceRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(loggerMiddleware);

// Routes
app.use('/', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});