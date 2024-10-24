const express = require('express');
const router = express.Router();
const adminRouter = require('./adminRouter');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const packageRouter = require('./packageRouter');
const reviewRouter = require('./reviewRouter');
const orderRouter = require('./orderRouter');

router.use('/admins', adminRouter);
router.use('/products', productRouter);
router.use('/customers', customerRouter);
router.use('/package', packageRouter);
router.use('/review', reviewRouter);
router.use('/order', orderRouter);

router.get('/', (req, res) => {
    res.send('hello');
});

router.get('/test', (req, res) => {
    res.send('Test works');
});

module.exports = router;