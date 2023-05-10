const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const notification = require('../controllers/notification.controller')

router.post('/notify/add',auth,notification.createNotification)
router.post('/notify/get',auth,notification.getNotification)
router.post('/notify/mark-read',auth,notification.markNotificationAsRead)
router.post('/notify/mark-all-read',auth,notification.markAllNotificationAsRead)

module.exports = router
