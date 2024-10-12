const express = require('express');
const controller = require('../controllers/controller')
const router = express.Router();

router.post('/register',controller.registerCustomer)

router.post('/login',controller.loginCustomer)

router.post('/:id/addToCart',controller.addToCart)

router.post('/:id/deleteCart',controller.deleteCart)

router.post('/:id/review',controller.review)






module.exports = router;
