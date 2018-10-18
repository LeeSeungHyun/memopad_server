const router = require('express').Router();
const controller = require('./writing.controller');

router.get('/list', controller.list);
router.get('/favoriteList', controller.favoriteList);
router.post('/create', controller.create);
router.post('/edit', controller.edit);
router.post('/delete', controller.delete);
router.post('/favorite', controller.isFavorite);

module.exports = router;