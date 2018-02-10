var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.query);
    const result = {
        bindPhone: false,
        beans:  [{
                "id": 1,
                "inviteePhone": "17728176310",
                "inviteeName": "invitee_name",
                "submitDate": 1512736618000,
                "auditStatus": 20,
                "redpackNum": "DRP201712084900",
                "amount": 5,
                "redpackStatus": 10,
                "receiveDate": null,
                "sendDate": null,
                "createdBy": 3406,
                "createdDate": 1512736618000,
                "modifiedBy": 1,
                "modifiedDate": 1512798353000,
                "inviterId": 1
            },
            {
                "id": 2,
                "inviteePhone": "13500000066",
                "inviteeName": "invitee_name",
                "submitDate": 1512737228000,
                "auditStatus": 20,
                "redpackNum": "DRP201712085000",
                "amount": 5,
                "redpackStatus": 0,
                "receiveDate": null,
                "sendDate": null,
                "createdBy": 3406,
                "createdDate": 1512737228000,
                "modifiedBy": 1,
                "modifiedDate": 1512800887000,
                "inviterId": 1
            },
            {
                "id": 3,
                "inviteePhone": "13500000065",
                "inviteeName": "invitee_name",
                "submitDate": 1512739831000,
                "auditStatus": 20,
                "redpackNum": "DRP20171208100",
                "amount": 5,
                "redpackStatus": -10,
                "receiveDate": null,
                "sendDate": null,
                "createdBy": 3406,
                "createdDate": 1512739831000,
                "modifiedBy": 1,
                "modifiedDate": 1512800890000,
                "inviterId": 1
            }
        ]
    };

    res.send(result);
});

module.exports = router;