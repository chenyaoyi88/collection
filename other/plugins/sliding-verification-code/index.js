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
  this.nStart = -1;
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
    this.oVerWrap.classList.add('ver-wrap');
    this.oVerWrap.insertAdjacentHTML(
      'beforeend',
      `
				<div class="ver-bg" data-id="bg"></div>
				<div class="ver-cover" data-id="cover">拖动滑块验证</div>
				<div class="ver-drag" data-id="drag"></div>
				`
    );
    this.oVerBg = this.oVerWrap.querySelector('[data-id=bg]');
    this.oVerCover = this.oVerWrap.querySelector('[data-id=cover]');
    this.oVerDrag = this.oVerWrap.querySelector('[data-id=drag]');

    this.run();
  };

  this.run = function() {
    var _this = this;
    // 鼠标/手指点击的时候
    this.oVerDrag.onmousedown = this.oVerDrag.ontouchstart = function(ev) {
      var oEvent = ev || event;
      var disX =
        (oEvent.clientX || oEvent.touches[0].clientX) -
        _this.oVerDrag.offsetLeft;
      // 清除返回动画
      _this.oVerDrag.classList.remove('ver-draging');
      _this.oVerBg.classList.remove('ver-draging');

      // 鼠标/手指点击且正则移动
      document.onmousemove = document.ontouchmove = function(ev) {
        var oEvent = ev || event;
        _this.l = (oEvent.clientX || oEvent.touches[0].clientX) - disX;
        _this.maxL =
          _this.oVerWrap.offsetWidth - _this.oVerDrag.offsetWidth + 1;

        if (_this.l < _this.nStart) {
          _this.l = _this.nStart;
        } else if (_this.l > _this.maxL) {
          _this.l = _this.maxL;
        }

        _this.oVerDrag.style.left = _this.l + 'px';
        _this.oVerBg.style.width = _this.l + 'px';
      };

      document.onmouseup = document.ontouchend = function() {
        if (_this.l === _this.maxL) {
          // 添加完成样式
          _this.oVerDrag.classList.add('ver-over');
          _this.oVerCover.classList.add('ver-over');
          _this.oVerCover.innerText = '验证通过';
          // 验证通过回调
          _this.options.success && _this.options.success();
          _this.oVerDrag.onmousedown = _this.oVerDrag.ontouchstart = null;
        } else {
          _this.oVerDrag.style.left = _this.nStart + 'px';
          _this.oVerBg.style.width = '0px';
          // 验证失败回调
          _this.options.failed && _this.options.failed();
        }
        // 添加返回动画
        _this.oVerDrag.classList.add('ver-draging');
        _this.oVerBg.classList.add('ver-draging');

        document.onmousemove = document.ontouchmove = null;
        document.onmouseup = document.ontouchend = null;
      };
    };
  };

  this.init(id);
}
