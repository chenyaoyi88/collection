<template>
    <button class="btn-vcode" :class="vcodeClass" @click="getMsgCode" :disabled="isCanClick">{{ countdownText }}</button>
</template>

<script>
export default {
  props: {
    vcodeClass: {
      type: String,
      default: 'btn-default'
    },
    btnName: {
      type: String,
      default: '获取验证码'
    },
    time: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      timer: null,
      countdownText: '',
      countdownTime: 0,
      isCanClick: false
    };
  },
  methods: {
    getMsgCode() {
      this.$emit('getMsgCode', this);
    },
    run() {
      if (this.isCanClick) return;
      this.isCanClick = true;
      this.countdownTime = this.time;
      this.countdown();
      this.timer = setInterval(() => {
        this.countdown();
      }, 1000);
    },
    // 停止
    stop() {
      clearInterval(this.timer);
    },
    // 继续
    continue() {
      this.run();
    },
    // 重置
    reset() {
      this.countdownText = this.btnName;
      this.isCanClick = false;
      this.countdownTime = this.time;
      clearInterval(this.timer);
    },
    countdown() {
      this.countdownTime -= 1;
      if (!this.countdownTime) {
        clearInterval(this.timer);
        this.isCanClick = false;
        this.countdownTime = this.time;
        this.countdownText = this.btnName;
        return;
      }
      this.countdownText = `${this.countdownTime}秒后重发`;
    }
  },
  created() {
    this.countdownText = this.btnName;
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss">
.btn-vcode {
  font-size: 14px;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
