require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./db');
const router = require('./routers/router');
// const { runSeeder } = require('./seeder');

app.use(cors());
app.use(express.json());
app.use('/', router);

connection().then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
    // await runSeeder(); // Uncomment this line to seed the database
});

module.exports = app;