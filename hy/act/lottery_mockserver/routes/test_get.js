var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  res.send({
    code: '0000',
    msg: 'success get',
    data: null
  });
});

module.exports = router;
