const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const auth = require('./auth');
const user = require('./user');
const writing = require('./writing');

//router.use('/user', authMiddleware);
router.use('/auth', auth);
router.use('/user', user);
router.use('/writing', writing);

module.exports = router;