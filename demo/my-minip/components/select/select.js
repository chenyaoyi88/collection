
Component({
  externalClasses: ['select-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  properties: {
    type: {
      type: String,
      value: 'checkbox'
    },
    title: {
      type: String,
      value: '附加服务'
    },
    list: {
      type: Array,
      value: []
    },
    name: {
      type: String,
      value: 'name'
    },
    value: {
      type: String,
      value: 'value'
    }
  },
  data: {
    isShow: false,
    isShowBg: false,
    isShowContent: false,
    isLock: false,
    currentIndex: -1,
    aSelected: [],
    sSelected: '',
    img: {
      cancel: './icon/close.png',
      selectedCheckbox: './icon/selected_checkbox.png',
      selectedRadio: './icon/selected_radio.png',
      unSelected: './icon/unselected.png',
    }
  },
  methods: {
    reset() {
      if (this.data.type === 'checkbox') {
        const aSelected = [];
        const sSelected = '';
        let list = this.data.list;
        for (let i = 0; i < list.length; i += 1) {
          list[i].selected = false;
        }
        this.setData({
          aSelected,
          sSelected,
          list
        });

        this.triggerEvent('checkboxChangeEvent', {
          aSelected,
          sSelected
        }, {});

      } else if (this.data.type === 'radio') {
        let list = this.data.list;
        const currentIndex = -1;
        for (let i = 0; i < list.length; i += 1) {
          list[i].selected = false;
        }
        this.setData({
          list,
          currentIndex
        });

        this.triggerEvent('radioChangeEvent', {
          oSelected: null
        }, {});
      }

    },
    show() {

      this.setData({
        isShow: true
      }, () => {
        setTimeout(() => {

          wx.hideTabBar({
            duration: true
          });

          this.setData({
            isShowBg: true,
            isShowContent: true
          });
        }, 50);
      });

    },
    hide() {
      this.setData({
        isShowBg: false,
        isShowContent: false
      }, () => {
        setTimeout(() => {
          wx.showTabBar({
            duration: true
          });
          this.setData({
            isShow: false
          });
          this.triggerEvent('selectHideEvent', {
            isShow: false
          }, {});
        }, 300);
      });
    },
    cancel() {
      this.hide();
    },

    select(index = -1) {

      if (this.data.type === 'checkbox') {
        let aSelected = [];
        let sSelected = '';

        for (let i = 0; i < this.data.list.length; i += 1) {
          if (this.data.list[i].selected) {
            sSelected += `${this.data.list[i].name} `;
            aSelected.push(this.data.list[i]);
          }
        }

        this.setData({
          aSelected,
          sSelected,
        });

        this.triggerEvent('checkboxChangeEvent', {
          aSelected,
          sSelected,
        }, {});

      } else if (this.data.type === 'radio') {
        let list = this.data.list;
        for (let i = 0; i < list.length; i += 1) {
          list[i].selected = false;
        }
        list[index].selected = true;

        this.setData({
          list
        });

        this.triggerEvent('radioChangeEvent', {
          oSelected: list[index]
        }, {});

      }
    },

    checkboxChange(e) {
      const index = e.currentTarget.dataset.index;
      const item = e.currentTarget.dataset.item;

      let list = this.data.list;
      list[index].selected = !list[index].selected;

      this.setData({
        list
      }, () => {
        // 处理
        this.select();
      });
    },

    radioChange(e) {
      const index = e.currentTarget.dataset.index;
      const item = e.currentTarget.dataset.item;

      if (this.data.currentIndex === index) return;
      let list = this.data.list;
      list[index].selected = true;
      const currentIndex = index;

      this.setData({
        list,
        currentIndex
      }, () => {
        this.select(currentIndex);
      });

    },

    // 底部确定按钮
    selectComfirm() {
      this.hide();
      if (this.data.type === 'checkbox') {
        this.triggerEvent('selectComfirmEvent', {
          aSelected: this.data.aSelected,
          sSelected: this.data.sSelected
        }, {});
      } else if (this.data.type === 'radio') {
        this.triggerEvent('selectComfirmEvent', {
          oSelected: this.data.list[this.data.currentIndex]
        }, {});
      }
    },
  },
  ready() {
    this.triggerEvent('selectEvent', {
      oSelect: this
    }, {});
  }
})