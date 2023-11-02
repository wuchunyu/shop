import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../utils/util';

Page({
  data: {
    list: [],
    banner: '',
    time: 0,
    showBannerDesc: false,
    statusTag: '',
  },

  onLoad(query) {
    const promotionID = parseInt(query.promotion_id);
    this.getGoodsList(promotionID);
  },

  getGoodsList(promotionID) {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchPromotion', {}, 'POST', res.code).then(
            (res) => {
              const { list, banner, time, showBannerDesc, statusTag } = res.data;
              const goods = list.map((item) => ({
                ...item,
                tags: item.tags.map((v) => v.title),
              }));
              _this.setData({
                list: goods,
                banner,
                time,
                showBannerDesc,
                statusTag,
              });
            }
          );
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  goodClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.list[index];
    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },

  cardClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  bannerClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击规则详情',
    });
  },
});
