require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path'); // Make sure to import 'path'
const connection = require('./db');
const router = require('./routers/router');
// const { runSeeder } = require('./seeder');

// Middleware setup
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/', router);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

connection().then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
    // await runSeeder(); // Uncomment this line to seed the database
});

module.exports = app;