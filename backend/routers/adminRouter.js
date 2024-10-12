const express = require('express');
const controller = require('../controllers/controller')
const router = express.Router();


router.post('/register',controller.registerAdmin)

router.post('/login',controller.loginAdmin)


module.exports = router;
