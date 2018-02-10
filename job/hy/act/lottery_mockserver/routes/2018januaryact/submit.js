var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);

  const result = {
    msg: 'OPENID不能为空',
    code: 'VALID_CODE_SUCCESS'
  };

  res.send(result);
});

module.exports = router;
