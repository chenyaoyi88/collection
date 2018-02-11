var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.body);
    const result = {
        code: 'SUCCESS',
        msg: '验证码错误',
        data: null
    };

    // FAIL     失败
    // SUCCESS  成功
    // VALID_CODE_ERROR 验证码错误
    // UN_BOUND 未关注公众号
    // ALREADY_BOUND    已绑定微信公众号
    // UN_REGISTERED    未注册广货宝
    // PARAM_ERR    参数错误

    res.send(result);
});

module.exports = router;