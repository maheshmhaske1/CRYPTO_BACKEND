var express = require('express');
var router = express.Router();
const otpController = require('../controllers/otp.controller')

router.post('/otp/send', otpController.sendOtp)
router.get('/otp/send/:mobile', otpController.sendOtpMobile)
router.post('/otp/verify', otpController.verifyOtp)

module.exports = router;
