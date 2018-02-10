var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.body);

    // 000 成功
    // 500 失败系统内部异常
    // 001 失败1-未查询到手机号
    // 002 失败2-审核状态<已提交 
    // 003 失败3-GPS坐标不符或司机状态=审核不通过
    // 004 失败4-没有关注公众号
    // 005 失败5-已领 
    // 006 失败6-成功抽奖人数>100 
    // 007 失败7-审核状态=已申请 
    // 008 失败8-老司机不能参与

    const result = {
        code: '008',
        message: '非常抱歉您的资料不符合本次活动要求'
    };

    res.send(result);
});

module.exports = router;