const AuthStepType = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    currAuthStep: {
      type: Number,
      value: AuthStepType.ONE,
    },
    userInfo: {
      type: Object,
      value: {},
    },
    isNeedGetUserInfo: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    defaultAvatarUrl:
      'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png',
    AuthStepType,
    hasUserInfo: false,
    userInfo: {},
  },
  onLoad() {
  },
  methods: {
    gotoUserEditPage() {
      wx.getUserProfile({
        desc: '获取用户的信息',
        success: res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'http://g.recallg.com/token',
                  header: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        },
        fail: res => {
          console.log("失败", res)
        }
      })
    },
  },
});
