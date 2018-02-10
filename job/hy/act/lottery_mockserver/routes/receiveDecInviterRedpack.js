var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.query);

    /**
     *  000 成功
        500 失败系统内部异常
        001 失败1-无奖励
        002 失败2-无奖励，已领取奖励>=10 
        003 失败3-没有关注公众号
        004 失败4-存在多个邀请人
     */
    const result = {
        "code": "003",
        "message": "请先关注“广货宝”公众号奖励会通过广货宝公众号发送给您"
    };

    res.send(result);
});

module.exports = router;