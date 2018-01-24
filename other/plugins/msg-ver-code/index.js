/**
 * 短信验证码功能
 * 
 * @param {any} options 
 */
function MsgVcode(options) {
  this.oVcode = null;
  this.oVcodeBtn = null;
  this.oTimer = null;

  this.options = null;
  this.btnText = '获取验证码';
  this.nCountdownTime = -1;
  this.isCountdown = false;

  // 初始化
  this.init = () => {
    this.create();
  };

  // 创建
  this.create = () => {
    // 设置默认参数
    this.options = options || {};
    this.options.id = this.options.id || {};
    this.options.class = this.options.class || 'msg-vcode';
    this.options.btnText = this.options.btnText || '获取验证码';
    this.options.time = this.options.time || 60;
    this.nCountdownTime = this.options.time;
    this.options.activeClass = this.options.activeClass || 'active';

    if (!this.options.id) return;
    const aVcode = document.querySelectorAll('#' + this.options.id);
    // 一个 id 对应一个倒计时
    if (aVcode.length !== 1) return;

    this.oVcode = aVcode[0];
    this.oVcode.classList.add(this.options.class);
    this.oVcode.innerHTML = `<button data-id="msg-vcode" class="msg-vcode-btn">${
      this.options.btnText
    }</button>`;
    this.oVcodeBtn = this.oVcode.querySelector('[data-id=msg-vcode]');

    clearInterval(this.oTimer);
    this.start();
  };

  this.run = () => {
    this.oVcodeBtn.setAttribute('disabled', true);
    this.countdown(this);
    this.oTimer = setInterval(() => {
      this.countdown();
    }, 1000);
  };

  // 停止
  this.stop = () => {
    clearInterval(this.oTimer);
  };

  // 继续
  this.continue = () => {
    this.run();
  };

  // 重置
  this.reset = () => {
    this.oVcodeBtn.innerText = this.options.vcodeBtnText;
    this.oVcodeBtn.removeAttribute('disabled');
    this.nCountdownTime = this.options.time;
    this.oVcodeBtn.classList.remove(this.options.activeClass);
    clearInterval(this.oTimer);
    this.start();
  };

  // 倒计时
  this.countdown = () => {
    this.oVcodeBtn.classList.add(this.options.activeClass);
    this.nCountdownTime--;
    if (!this.nCountdownTime) {
      clearInterval(this.oTimer);
      this.oVcodeBtn.innerText = this.vcodeBtnText;
      this.oVcodeBtn.removeAttribute('disabled');
      this.nCountdownTime = this.options.time;
      this.oVcodeBtn.classList.remove(this.options.activeClass);
      return;
    }
    this.oVcodeBtn.innerText = this.nCountdownTime + '秒后重发';
  };

  // 开始执行
  this.start = () => {
    if (this.isCountdown) return;
    this.isCountdown = true;
    this.oVcodeBtn.addEventListener(
      'click',
      () => {
        this.options.control && this.options.control(this);
      },
      false
    );
  };

  this.init();
}
