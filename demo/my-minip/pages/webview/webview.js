Page({
  data: {
    webUrl: ''
  },
  onLoad(options) {
    console.log(options);
    this.setData({
      webUrl: options.webUrl
    })
  }
})
