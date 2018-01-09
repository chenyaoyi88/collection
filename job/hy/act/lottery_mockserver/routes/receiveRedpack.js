var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    // console.log(req.body);

    // const result = {
    //     code: '000',
    //     message: 'success'
    // };

    // res.send(result);


    if (req.body.data) {
        //能正确解析 json 格式的post参数
        res.send({
            code: '001',
            message: 'req.body.data 直接拿到'
        });
    } else {
        //不能正确解析json 格式的post参数
        var body = '',
            jsonStr;
        req.on('data', function (chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function () {
            //读取参数流结束后将转化的body字符串解析成 JSON 格式
            try {
                jsonStr = JSON.parse(body);
            } catch (err) {
                jsonStr = null;
            }
            jsonStr ? res.send({
                code: '000',
                message: 'JSON.parse 解析'
            }) : res.send({
                code: '500',
                message: 'error'
            });
        });
    }
});

module.exports = router;