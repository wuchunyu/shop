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
      { key: 0, text: '待付款' },
      { key: 1, text: '待发货' },
      { key: 2, text: '待收货' },
      { key: 3, text: '已取消' },
      { key: 4, text: '已完成' },
    ],
    curTab: '',
    orderList: [],
    listLoading: 0,
    pullDownRefreshing: false,
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
    // const { callback } = e.detail;
    // this.setData({ pullDownRefreshing: true });
    // this.refreshList(this.data.curTab)
    //   .then(() => {
    //     this.setData({ pullDownRefreshing: false });
    //     callback && callback();
    //   })
    //   .catch((err) => {
    //     this.setData({ pullDownRefreshing: false });
    //     Promise.reject(err);
    //   });
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
    this.setData({ listLoading: 1 });
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          request('/fetchOrders', {
            orderStatus: statusCode
          }, 'GET', res.code).then(res => {
            _this.page.num++;
            let orderList = _this.data.orderList.concat(res.data);
            orderList.forEach(item => {
              item.totalAmount = 0;
              item.orderItemVOs.forEach(v => {
                item.totalAmount = item.totalAmount + v.price * v.stockQuantity;
              })
            })
            _this.setData({
              orderList,
              listLoading: res.data.length > 0 ? 0 : 2,
            })
          });
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

  refreshList(status = -1) {
    this.page = {
      size: this.page.size,
      num: 1,
    };
    this.setData({ curTab: status, orderList: [] });

    return Promise.all([
      this.getOrderList(status, true),
    ]);
  },

  onRefresh() {
    this.refreshList(this.data.curTab);
  },

  onOrderCardTap(e) {
    const { order } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order/order-detail/index?orderNo=${JSON.stringify(order)}`,
    });
  },
});
