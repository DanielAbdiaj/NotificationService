

const router = require('express').Router();

const {mailSignup}= require('../mail/eventController.js')
const {textSignup}= require('../messages/eventController.js')
const {whatsAppSignup} = require('../messages/eventController.js')
const {realtimeMessage} = require('../realtimeNotification/eventController')

router.post('/mail/signup', mailSignup)
router.post('/textMessage/signup',textSignup)
router.post('/whatsApp/signup',whatsAppSignup)
router.post('/realtimeNotification/realtimeMessage',realtimeMessage)

module.exports = router;