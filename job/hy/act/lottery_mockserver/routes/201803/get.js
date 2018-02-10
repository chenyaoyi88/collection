var express = require('express');
var router = express.Router();

let canLotteryTimes = 3;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req.headers);

    // 10: 已获得
    // 20: 待发送
    // 30: 已发送

    // 是否已绑定微信
    // true: 是
    // false: 否

    canLotteryTimes--;

    const result = {
        "canLotteryTimes": canLotteryTimes,
        "prizes": [{
            "amount": 1,
            "status": 10
        }, {
            "amount": 1,
            "status": 20
        }, {
            "amount": 1,
            "status": 30
        }, {
            "amount": 1,
            "status": 40
        }],
        "isBind": true
    };

    res.send(result);
});

module.exports = router;