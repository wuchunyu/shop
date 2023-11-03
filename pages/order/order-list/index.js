import { OrderStatus } from '../config';
import { cosThumb } from '../../../utils/util';
import {
  request
} from '../../../utils/util';

Page({
  page: {
    size: 5,
    num: 1,
  },

  data: {
    tabs: [
      { key: -1, text: '全部' },
      { key: OrderStatus.PENDING_PAYMENT, text: '待付款', info: '' },
      { key: OrderStatus.PENDING_DELIVERY, text: '待发货', info: '' },
      { key: OrderStatus.PENDING_RECEIPT, text: '待收货', info: '' },
      { key: OrderStatus.COMPLETE, text: '已完成', info: '' },
    ],
    curTab: -1,
    orderList: [],
    listLoading: 0,
    pullDownRefreshing: false,
    emptyImg:
      'https://cdn-we-retail.ym.tencent.com/miniapp/order/empty-order-list.png',
    backRefresh: false,
    status: -1,
  },

  onLoad(query) {
    let status = parseInt(query.status);
    status = this.data.tabs.map((t) => t.key).includes(status) ? status : -1;
    this.init(status);
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({ backRefresh: false });
  },

  onReachBottom() {
    if (this.data.listLoading === 0) {
      this.getOrderList(this.data.curTab);
    }
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onPullDownRefresh_(e) {
    const { callback } = e.detail;
    this.setData({ pullDownRefreshing: true });
    this.refreshList(this.data.curTab)
      .then(() => {
        this.setData({ pullDownRefreshing: false });
        callback && callback();
      })
      .catch((err) => {
        this.setData({ pullDownRefreshing: false });
        Promise.reject(err);
      });
  },

  init(status) {
    status = status !== undefined ? status : this.data.curTab;
    this.setData({
      status,
    });
    this.refreshList(status);
  },

  getOrderList(statusCode = -1, reset = false) {
    const params = {
      parameter: {
        pageSize: this.page.size,
        pageNum: this.page.num,
      },
    };
    if (statusCode !== -1) params.parameter.orderStatus = statusCode;
    this.setData({ listLoading: 1 });
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/fetchOrders', {}, 'GET', res.code).then(res => {
            _this.page.num++;
            let orderList = [];
            if (res && res.data && res.data.orders) {
              orderList = (res.data.orders || []).map((order) => {
                return {
                  id: order.orderId,
                  orderNo: order.orderNo,
                  parentOrderNo: order.parentOrderNo,
                  status: order.orderStatus,
                  statusDesc: order.orderStatusName,
                  amount: order.paymentAmount,
                  totalAmount: order.totalAmount,
                  logisticsNo: order.logisticsVO.logisticsNo,
                  createTime: order.createTime,
                  goodsList: (order.orderItemVOs || []).map((goods) => ({
                    id: goods.id,
                    thumb: cosThumb(goods.goodsPictureUrl, 70),
                    title: goods.goodsName,
                    skuId: goods.skuId,
                    spuId: goods.spuId,
                    specs: (goods.specifications || []).map(
                      (spec) => spec.specValue,
                    ),
                    price: goods.actualPrice,
                    num: goods.buyQuantity,
                  })),
                  buttons: order.buttonVOs || [],
                  groupInfoVo: order.groupInfoVo,
                  freightFee: order.freightFee,
                };
              });
            }
            _this.setData({
              orderList: _this.data.orderList.concat(orderList),
              listLoading: orderList.length > 0 ? 0 : 2,
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  onReTryLoad() {
    this.getOrderList(this.data.curTab);
  },

  onTabChange(e) {
    const { value } = e.detail;
    this.setData({
      status: value,
    });
    this.refreshList(value);
  },

  getOrdersCount() {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchOrdersCount', {}, 'GET', res.code).then((res) => {
            const tabsCount = res.data || [];
            const { tabs } = this.data;
            tabs.forEach((tab) => {
              const tabCount = tabsCount.find((c) => c.tabType === tab.key);
              if (tabCount) {
                tab.info = tabCount.orderNum;
              }
            });
            _this.setData({ tabs });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  refreshList(status = -1) {
    this.page = {
      size: this.page.size,
      num: 1,
    };
    this.setData({ curTab: status, orderList: [] });

    return Promise.all([
      this.getOrderList(status, true),
      this.getOrdersCount(),
    ]);
  },

  onRefresh() {
    this.refreshList(this.data.curTab);
  },

  onOrderCardTap(e) {
    const { order } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order/order-detail/index?orderNo=${order.orderNo}`,
    });
  },
});
