function VerDrag(id, options) {
  // 最外层包裹
  this.oVerWrap = null;
  // 背景填色层
  this.oVerBg = null;
  // 覆盖层
  this.oVerCover = null;
  // 拖动方块
  this.oVerDrag = null;
  // 初始位置
  this.nStart = 0;
  // 正在移动的位置
  this.l = 0;
  // 最大移动距离
  this.maxL = 0;
  // 回调选项
  this.options = null;

  // 初始化
  this.init = function(id) {
    this.oVerWrap = document.getElementById(id);
    if (!this.oVerWrap) return;

    this.options = options || {};
    const verWrapheight = this.options.height || 50;
    const verWrapClass = this.options.class || 'ver-wrap-custom';

    this.oVerWrap.style.height = `${verWrapheight}px`;
    this.oVerWrap.classList.add('ver-wrap', verWrapClass);

    this.oVerWrap.insertAdjacentHTML(
      'beforeend',
      `
				<div class="ver-bg" data-id="bg"></div>
				<div class="ver-cover" data-id="cover">拖动滑块验证</div>
				<div class="ver-drag" data-id="drag" style="width:${verWrapheight}px"></div>
				`
    );
    this.oVerBg = this.oVerWrap.querySelector('[data-id=bg]');
    this.oVerCover = this.oVerWrap.querySelector('[data-id=cover]');
    this.oVerDrag = this.oVerWrap.querySelector('[data-id=drag]');
    this.maxL = this.oVerWrap.offsetWidth - this.oVerDrag.offsetWidth + 1;

    this.verificate();
  };

  this.verificate = function() {
    const _this = this;
    // 鼠标/手指点击的时候
    this.oVerDrag.onmousedown = this.oVerDrag.ontouchstart = function(ev) {
      const oEvent = ev || event;
      const disX =
        (oEvent.clientX || oEvent.touches[0].clientX) -
        _this.oVerDrag.offsetLeft;
      // 清除返回动画
      _this.oVerDrag.classList.remove('ver-draging');
      _this.oVerBg.classList.remove('ver-draging');

      // 鼠标/手指点击且正则移动
      document.onmousemove = document.ontouchmove = function(ev) {
        const oEvent = ev || event;
        _this.l = (oEvent.clientX || oEvent.touches[0].clientX) - disX;

        if (_this.l < _this.nStart) {
          _this.l = _this.nStart;
        } else if (_this.l > _this.maxL) {
          _this.l = _this.maxL;
        }

        _this.oVerDrag.style['webkitTransform'] =
          'translate3d(' + _this.l + 'px, 0px, 0px)';
        _this.oVerDrag.style['webkitTransform'] = `translate3d(${
          _this.l
        }px, 0px, 0px)`;
        _this.oVerBg.style.width = _this.l + 'px';
        return false;
      };

      document.onmouseup = document.ontouchend = function() {
        if (!_this.l) {
          // 点击松开，但是没动，返回
        } else if (_this.l === _this.maxL) {
          // 验证通过-到达终点
          _this.pass();
        } else {
          // 验证失败-返回
          _this.notPass();
        }

        document.onmousemove = document.ontouchmove = null;
        document.onmouseup = document.ontouchend = null;
      };
    };
  };

  // 验证通过
  this.pass = function() {
    // 添加完成样式
    this.oVerDrag.classList.add('ver-over');
    this.oVerCover.classList.add('ver-over');
    this.oVerCover.innerText = '验证通过';
    // 验证通过回调
    this.options.success && this.options.success();
    this.oVerDrag.onmousedown = this.oVerDrag.ontouchstart = null;
  };

  // 验证不通过
  this.notPass = function() {
    this.oVerDrag.style['webkitTransform'] = `translate3d(${
      this.nStart
    }px, 0px, 0px)`;
    this.oVerBg.style.width = '0px';
    // 验证失败回调
    this.options.failed && this.options.failed();
    // 添加返回动画
    this.oVerDrag.classList.add('ver-draging');
    this.oVerBg.classList.add('ver-draging');
  };

  this.init(id);
}
