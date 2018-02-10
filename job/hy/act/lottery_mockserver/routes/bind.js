var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req.body);

    const result = {
        "id": 8,
        "phone": "13560427526",
        "openid": "o0cHiwG3VX3D6fWiaaf5wvucvA84",
        "fulfilled": false,
        "createdBy": 0,
        "createdDate": 1512800804947,
        "modifiedBy": 0,
        "modifiedDate": 1512800804947
      };

    res.send(result);
});

module.exports = router;