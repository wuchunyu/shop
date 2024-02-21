import { request } from '../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    orderStatusList: {
      0: '待付款',
      1: '待发货',
      2: '待收货',
      3: '已取消',
      4: '已完成'
    },
    pageLoading: true,
    order: {}, // 后台返回的原始数据
  },

  onLoad(query) {
    let order = JSON.parse(query.orderNo);
    if (order.orderStatus === 0) {
      order.autoCancelTime = order.autoCancelTime - (new Date().getTime());
    }
    this.setData({
      order
    })
    this.init();
    this.navbar = this.selectComponent('#navbar');
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    // this.onRefresh();
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onImgError(e) {
    if (e.detail) {
      console.error('img 加载失败');
    }
  },

  // 页面初始化，会展示pageLoading
  init() {
    this.setData({ pageLoading: true });
    // this.getStoreDetail();
  },

  editAddressHandle() {
    console.log('--editAddressHandle--', this.data.order);
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?detail=${JSON.stringify(this.data.order.orderAddress)}`
    });
  },

  onOrderNumCopy() {
    wx.setClipboardData({
      data: this.data.order.uid,
    });
  },

  onToInvoice() {
    // wx.navigateTo({
    //   url: `/pages/order/invoice/index?orderNo=${this.data._order.orderNo}`,
    // });
  },

  onSuppleMentInvoice() {
    // wx.navigateTo({
    //   url: `/pages/order/receipt/index?orderNo=${this.data._order.orderNo}`,
    // });
  },

  clickService() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '您点击了联系客服',
    });
  },

  onOrderInvoiceView() {
    // wx.navigateTo({
    //   url: `/pages/order/invoice/index?orderNo=${this.orderNo}`,
    // });
  },
});
