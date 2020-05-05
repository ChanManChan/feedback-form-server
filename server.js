const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', feedbackRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
