import {
  getUrl,
  postUrl
} from '../../../utils/util';
Page({
  data: {
    list: [],
  },
  init() {
    let _this = this;
    getUrl('/getCategoryList').then(res => { //分类 商品列表
      _this.setData({
        list: res.data,
      });
    });
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