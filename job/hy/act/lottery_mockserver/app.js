var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var index = require('./routes/index');
var users = require('./routes/users');

var submit = require('./routes/submit');
var lottery = require('./routes/lottery');
var draw = require('./routes/draw');
var receiveRedpack = require('./routes/receiveRedpack');
var findDecInviterRedpackList = require('./routes/findDecInviterRedpackList');
var bind = require('./routes/bind');
var receiveDecInviterRedpack = require('./routes/receiveDecInviterRedpack');

var getvalidcode = require('./routes/2018januaryact/getvalidcode');
var submitJanuaryact = require('./routes/2018januaryact/submit');

var marchLotteryGet = require('./routes/201803/get');
var marchLotteryGetH5 = require('./routes/201803/get.h5');
var marchLotteryVcode = require('./routes/201803/vcode');
var marchLottery = require('./routes/201803/lottery');
var marchBind = require('./routes/201803/bind');

var app = express();

/**
 * @description 允许跨域
 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,token,authorization');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200).end();
  } else {
    next();
  }
});

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api/v1/decLotteryActivity/submit', submit);
app.use('/api/v1/decLotteryActivity/lottery', lottery);
app.use('/api/v1/decLotteryActivity/draw', draw);
app.use('/api/v1/receiveRedpack', receiveRedpack);
app.use('/api/v1/findDecInviterRedpackList', findDecInviterRedpackList);
app.use('/api/v1/decInviter/bind', bind);
app.use('/api/v1/receiveDecInviterRedpack', receiveDecInviterRedpack);

app.use('/api/v1/activity/2018/january/getvalidcode', getvalidcode);
app.use('/api/v1/activity/2018/january/submit', submitJanuaryact);

app.use('/api/v1/activity/2018/march/get', marchLotteryGet);
app.use('/api/v1/activity/2018/march/get/H5', marchLotteryGetH5);
app.use('/api/v1/verificationCode', marchLotteryVcode);
app.use('/api/v1/activity/2018/march/lottery', marchLottery);
app.use('/api/v1/wechatUser/bind/H5', marchBind);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;