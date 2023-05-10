const router = require("express").Router();
const Controller = require('../controllers/user');


router.put('/user/update/:userId', Controller.updateUser);
router.post('/user/is-found', Controller.isUserExist)
router.post('/user/reset-password', Controller.resetPassword)
router.get('/user/get/:userId', Controller.getById)

module.exports = router;
