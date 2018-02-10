var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.headers);

  const result = {
    msg: '请求成功',
    code: 'FAIL',
    data: {
      id: 31782,
      mobile: '',
      code: '380519',
      token: null,
      expireTime: 1516698570284,
      type: 3,
      showInvite: false
    }
  };

  res.send(result);
});

module.exports = router;
