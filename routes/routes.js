

const router = require('express').Router();

const {mailSignup}= require('../mail/eventController.js')
const {textSignup}= require('../messages/eventController.js')
const {whatsAppSignup} = require('../messages/eventController.js')

router.post('/mail/signup', mailSignup)
router.post('/textMessage/signup',textSignup)
router.post('/whatsApp/signup',whatsAppSignup)

module.exports = router;