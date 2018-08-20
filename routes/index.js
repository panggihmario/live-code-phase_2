var express = require('express');
var router = express.Router();
var User = require('../controller/userController')
var Item = require('../controller/itemController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',User.register)
router.post('/request_token',User.login)
router.post('/items',Item.create)
router.get('/items',Item.listItem)
router.get('/items/find',Item.find)




module.exports = router;
