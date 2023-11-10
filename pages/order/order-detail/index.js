import { formatTime, request } from '../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
import { getAddressPromise } from '../../usercenter/address/list/util';

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
    storeDetail: {},
    countDownTime: null,
    addressEditable: false,
    backRefresh: false, // 用于接收其他页面back时的状态
    logisticsNodes: [],
    /** 订单评论状态 */
    orderHasCommented: true,
  },

  onLoad(query) {
    this.setData({
      order: JSON.parse(query.orderNo)
    })
    // this.orderNo = query.orderNo;
    this.init();
    this.navbar = this.selectComponent('#navbar');
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    // 当从其他页面返回，并且 backRefresh 被置为 true 时，刷新数据
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({ backRefresh: false });
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
    this.getStoreDetail();
  },

  onEditAddressTap() {
    getAddressPromise()
      .then((address) => {
        this.setData({
          'order.logisticsVO.receiverName': address.name,
          'order.logisticsVO.receiverPhone': address.phone,
          '_order.receiverAddress': address.address,
        });
      })
      .catch(() => { });

    wx.navigateTo({
      url: `/pages/usercenter/address/list/index?selectMode=1`,
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

  onDeliveryClick() {
    const logisticsData = {
      nodes: this.data.logisticsNodes,
      company: this.data.order.logisticsVO.logisticsCompanyName,
      logisticsNo: this.data.order.logisticsVO.logisticsNo,
      phone: this.data.order.logisticsVO.logisticsCompanyTel,
    };
    // wx.navigateTo({
    //   url: `/pages/order/delivery-detail/index?data=${encodeURIComponent(
    //     JSON.stringify(logisticsData),
    //   )}`,
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
