const express = require('express');
// const connection = require('../controllers/controller')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello');
})



module.exports = router;
