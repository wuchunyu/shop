App({
  globalData: {
  },
  onLaunch: function () { },
  onShow: function () { },
  // 监听全局变量变化
  watch: function (variate, method) {
    var obj = this.globalData;
    let val = obj[variate];// 单独变量来存储原来的值
    Object.defineProperty(obj, variate, {
      configurable: false,
      enumerable: true,
      set: function (value) {
        val = value;// 重新赋值
        method(variate, value);// 执行回调方法
      },
      get: function () {
        // 在其他界面调用getApp().globalData.variate的时候，这里就会执行。
        return val; // 返回当前值
      }
    })
  }
});
