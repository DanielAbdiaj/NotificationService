

const router = require('express').Router();

const {signup}= require('../mail/signUpController.js')

router.post('/user/signup', signup)

module.exports = router;