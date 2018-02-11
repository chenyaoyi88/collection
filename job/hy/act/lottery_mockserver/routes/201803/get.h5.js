var express = require('express');
var router = express.Router();

let count = 0;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // console.log(req.headers);

    // 10: 已获得
    // 20: 待发送
    // 30: 已发送

    // 是否已绑定微信
    // true: 是
    // false: 否

    count++;

    console.log(count);

    const result = {
        // code: count === 2? 'SUCCESS' : 'UN_BIND', 
        code: 'SUCCESS',
        msg: 'SUCCESS',
        data: 
        {
            canLotteryTimes: 0,
            mobile: '13700137000',
            isBind: true,
            prizes: [{
                amount: 1.23,
                winningTime: new Date().getTime(),
                status: 10
            },{
                amount: 1.24,
                winningTime: new Date().getTime(),
                status: 20
            },{
                amount: 1.25,
                winningTime: new Date().getTime(),
                status: 30
            },{
                amount: null,
                winningTime: new Date().getTime(),
                status: 40
            }]
        }
    };

    res.send(result);
});

module.exports = router;