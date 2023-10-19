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
  },
  onLoad() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  methods: {
    gotoUserEditPage() {
      console.log("点击了按按钮")
      wx.getUserProfile({
        desc: '获取用户的信息',
        success: res => {
          console.log("成功", res)
          this.setData({
            nickName: res.userInfo.nickName,
            touxian: res.userInfo.avatarUrl
          })
        },
        fail: res => {
          console.log("失败", res)
        }
      })
    },
  },
});
