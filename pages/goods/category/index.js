import {
  request,
} from '../../../utils/util';
Page({
  data: {
    list: [],
  },
  init() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/getCategoryList', {}, 'GET', res.code).then(res => { //分类 商品列表
            console.log('--getCategoryList--', res);
            _this.setData({
              list: res.data,
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(data) {
    console.log('--onChange--', data, data.detail.item.groupId);
    wx.navigateTo({
      url: `/pages/goods/list/index?item=${JSON.stringify(data.detail.item)}`,
    });
  },
  onLoad() {
    this.init(true);
  },
});