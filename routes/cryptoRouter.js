const express = require('express')
const router = express.Router()


const crypto = require('../controllers/cryptoController')

router.get('/crypto/get-news', crypto.getCryptoNews)
// router.get('/get-detail/:currency_name', crypto.getCryptoDetails)
router.get('/crypto/get-topGainerLoser', crypto.getTopGainerAndLoser)
router.get('/crypto/get-top10', crypto.getTop50)

module.exports = router
