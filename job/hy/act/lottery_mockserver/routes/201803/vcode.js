var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.body);

    // NO_TIMES: 没有可抽奖次数
    // NOT_FOUND_USERD: 找不到用户
    // ACT_END: 活动已

    const result = {
        "id": null,
        "mobile": "13480250652",
        "code": null,
        "token": null,
        "expireTime": null,
        "type": 0
    };

    res.send(result);
});

module.exports = router;