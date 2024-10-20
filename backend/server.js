require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const customerRouter = require('./routers/customerRouter');
const adminRouter = require('./routers/adminRouter');
const connection = require('./db');
// const { runSeeder } = require('./seeder');

app.use(cors());
app.use(express.json());
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);

connection().then(async () => {
    // await runSeeder(); // Uncomment this line to seed the database
    app.listen(process.env.PORT, () => {
        console.log('Server Connected');
    });
});

module.exports = app;