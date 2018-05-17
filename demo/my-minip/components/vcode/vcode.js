Component({
  externalClasses: ['vcode-class'],
  properties: {
    vcodeClass: {
      type: String,
      value: 'btn-default'
    },
    btnName: {
      type: String,
      value: '获取验证码'
    },
    time: {
      type: Number,
      value: 60
    }
  },
  data: {
    timer: null,
    countdownText: '',
    countdownTime: 0,
    isCanClick: false
  },
  methods: {
    getMsgCode() {
      console.log(this);
      this.triggerEvent('getMsgCode', this, {});
    },
    run() {
      if (this.data.isCanClick) return;
      this.setData({
        isCanClick: true
      });
      this.data.countdownTime = this.data.time;
      this.countdown();
      this.data.timer = setInterval(() => {
        this.countdown();
      }, 1000);
    },
    // 停止
    stop() {
      clearInterval(this.data.timer);
    },
    // 继续
    continue() {
      this.run();
    },
    // 重置
    reset() {
      this.setData({
        countdownText: this.data.btnName,
        isCanClick: false,
        countdownTime: this.data.time
      }, () => {
        clearInterval(this.data.timer);
      });
    },
    countdown() {
      this.data.countdownTime -= 1;
      if (!this.data.countdownTime) {
        clearInterval(this.data.timer);
        this.setData({
          isCanClick: false,
          countdownTime: this.data.time,
          countdownText: this.data.btnName
        });
        return;
      }

      this.setData({
        countdownText: `${this.data.countdownTime}秒后重发`
      });
    }
  },
  ready() {
    this.setData({
      countdownText: this.data.btnName
    });
    clearInterval(this.data.timer);
  },
  // 每次创建都重置
  onShow() {
    this.reset();
  }
});
