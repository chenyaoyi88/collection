var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.body);
    
    const aPrice = [
        { real: 50, fake: 1.5 },
        { real: 8, fake: 1.08 },
        { real: 100, fake: 2 },
        { real: 10, fake: 1.1 },
        { real: 30, fake: 1.3 },
        { real: 3, fake: 1.03 },
        { real: 20, fake: 1.2 },
        { real: 5, fake: 1.05 }
    ];

    const result = {
        result: 'success',
        status: 1,
        lotteryStatus: 1,
        amount: aPrice[0].fake
    };

    res.send(result);
});

module.exports = router;