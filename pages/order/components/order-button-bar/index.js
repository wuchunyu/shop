import Toast from 'tdesign-miniprogram/toast/index';
import Dialog from 'tdesign-miniprogram/dialog/index';
import { request } from '../../../../utils/util'
import { buttons } from '../config';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    order: {
      type: Object,
    },
    goodsIndex: {
      type: Number,
      value: null,
    },
    isBtnMax: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    order: {},
    buttons,
    // buttons: [[{ primary: false, type: 2, name: "取消订单" }, { primary: true, type: 1, name: "付款" }], [{ primary: false, type: 2, name: "取消订单" }, { primary: true, type: 9, name: "再次购买" }], [{ primary: true, type: 3, name: "确认收货" }], [], [{ primary: false, type: 4, name: "申请售后" }, { primary: true, type: 6, name: "评价" }]],
  },
  created() {
    this.setData({
      order: this.properties.order
    })
  },
  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onOrderBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case 2:
          this.onCancel();
          break;
        case 3:
          this.onConfirm(this.data.order);
          break;
        case 1:
          this.onPay(this.data.order);
          break;
        case 4:
          this.onApplyRefund(this.data.order);
          break;
        case 6:
          this.onAddComment(this.data.order);
          break;
        case 9:
          this.onBuyAgain(this.data.order);
      }
    },

    onCancel() {
      let _this = this;
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求 
            request('/cancelOrder', { uid: _this.data.order.uid }, 'POST', res.code).then(res => {
              if (res.ec === 200) {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                })

              }
            });
          }
        }
      })
    },

    onConfirm() {
      Dialog.confirm({
        title: '确认是否已经收到货？',
        content: '',
        confirmBtn: '确认收货',
        cancelBtn: '取消',
      })
        .then(() => {
          let _this = this;
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求 
                request('/complete', { uid: _this.data.order.uid }, 'POST', res.code).then(res => {
                  if (res.ec === 200) {
                    wx.showToast({
                      title: '你确认了确认收货',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                });
              }
            }
          })
        })
        .catch(() => {
        });
    },

    onPay() {
      wx.navigateTo({
        url: `/pages/order/order-confirm/index?orderCardList=${JSON.stringify(this.data.order.orderItemVOs)}`
      });
    },

    onBuyAgain() {
      wx.navigateTo({
        url: `/pages/order/order-confirm/index?orderCardList=${JSON.stringify(this.data.order.orderItemVOs)}`
      });
    },

    onApplyRefund(order) {
      console.log('--onApplyRefund--', order);
      wx.navigateTo({ url: `/pages/order/apply-service/index?order=${JSON.stringify(order)}` });
    },

    onViewRefund() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了查看退款',
        icon: '',
      });
    },

    /** 添加订单评论 */
    onAddComment(order) {
      // const imgUrl = order?.goodsList?.[0]?.thumb;
      // const title = order?.goodsList?.[0]?.title;
      // const specs = order?.goodsList?.[0]?.specs;
      console.log('--添加订单评论--', order, this.properties, this.data);
      wx.navigateTo({
        url: `/pages/goods/comments/create/index?uid=${order.uid}`,
      });
    },
  },
});
