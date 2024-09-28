import dotenv from 'dotenv';
import express from 'express';
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// TODO: Implement middleware to connect the routes
app.use('/api/weather', apiRoutes);
app.use('*', htmlRoutes);

app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));
