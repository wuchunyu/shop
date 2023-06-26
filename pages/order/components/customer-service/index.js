Component({
  externalClasses: ['wr-class'],

  properties: {
    phone: String,
    desc: String,
  },

  data: {
    show: false,
  },

  methods: {
    onBtnTap() {
      this.setData({
        show: true,
      });
    },

    onDialogClose() {
      this.setData({
        show: false,
      });
    },

    onCall() {
      const { phone } = this.properties;
      wx.makePhoneCall({
        phone,
      });
    },
    onCallOnlineService() {
      wx.showToast({
        title: '你点击了在线客服',
      });
    },
  },
});
