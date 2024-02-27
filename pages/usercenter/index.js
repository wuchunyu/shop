import Toast from 'tdesign-miniprogram/toast/index';

const menuData = [
  [{
    title: '收货地址',
    tit: '',
    url: '',
    type: 'address',
  }],
  [
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service',
    },
  ],
];

const orderTagInfos = [{
  title: '待付款',
  iconName: 'wallet',
  orderNum: 1,
  status: 0,
},
{
  title: '待发货',
  iconName: 'deliver',
  orderNum: 2,
  status: 1,
},
{
  title: '待收货',
  iconName: 'package',
  orderNum: 3,
  status: 2,
},
{
  title: '待评价',
  iconName: 'comment',
  orderNum: 4,
  status: 4,
},
];

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phone: '',
  },
  menuData,
  orderTagInfos,
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
  },

  onClickCell({
    currentTarget
  }) {
    const {
      type
    } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        wx.navigateTo({
          url: '/pages/usercenter/address/list/index'
        });
        break;
      }
      // case 'service': {
      //   this.openMakePhone();
      //   break;
      // }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心',
          icon: '',
          duration: 1000,
        });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.status;
    console.log('--jumpNav--', e);
    wx.navigateTo({
      url: `/pages/order/order-list/index?status=${status}`
    });
  },

  jumpAllOrder() {
    console.log('--jumpAllOrder--');
    wx.navigateTo({
      url: '/pages/order/order-list/index'
    });
  },

  openMakePhone() {
    this.setData({
      showMakePhone: true
    });
  },

  closeMakePhone() {
    this.setData({
      showMakePhone: false
    });
  },

  call() {
    wx.makePhoneCall({
      phone: this.data.customerServiceInfo.servicePhone,
    });
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const {
      version,
      envVersion = __wxConfig
    } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});