var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  setTimeout(() => {
    res.send({
      code: '0000',
      msg: 'success post',
      data: null
    });
  }, 1000);
});

module.exports = router;
