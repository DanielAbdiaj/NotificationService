

const router = require('express').Router();

const {mail}= require('../mail/eventController.js')
const {textMessage}= require('../messages/eventController.js')

router.post('/mail', mail)
router.post('/textMessage',textMessage)


module.exports = router;

