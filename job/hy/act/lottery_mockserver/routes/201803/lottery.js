var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.headers);

    // NO_TIMES: 没有可抽奖次数
    // NOT_FOUND_USERD: 找不到用户
    // ACT_END: 活动已

    const result = {
        "code": "SUCCESS",
        "msg": "没有可抽奖次数",
        "data": {
            // 返现百分比
            percentage: 0.5,
            // 中奖金额
            amount: 0.5,
        }
    };

    res.send(result);
});

module.exports = router;