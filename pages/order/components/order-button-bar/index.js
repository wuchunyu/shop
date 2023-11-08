import Toast from 'tdesign-miniprogram/toast/index';
import Dialog from 'tdesign-miniprogram/dialog/index';
import { OrderButtonTypes } from '../../config';

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    order: {
      type: Object,
      observer(order) {
        console.log('--order--', order);
        // // 判定有传goodsIndex ，则认为是商品button bar, 仅显示申请售后按钮
        // if (this.properties?.goodsIndex !== null) {
        //   const goods = order.goodsList[Number(this.properties.goodsIndex)];
        //   this.setData({
        //     buttons: {
        //       left: [],
        //       right: (goods.buttons || []).filter((b) => b.type == OrderButtonTypes.APPLY_REFUND),
        //     },
        //   });
        //   return;
        // }
        // // 订单的button bar 不显示申请售后按钮
        // const buttonsRight = (order.buttons || [])
        //   // .filter((b) => b.type !== OrderButtonTypes.APPLY_REFUND)
        //   .map((button) => {
        //     //邀请好友拼团按钮
        //     if (button.type === OrderButtonTypes.INVITE_GROUPON && order.groupInfoVo) {
        //       const {
        //         groupInfoVo: { groupId, promotionId, remainMember, groupPrice },
        //         goodsList,
        //       } = order;
        //       const goodsImg = goodsList[0] && goodsList[0].imgUrl;
        //       const goodsName = goodsList[0] && goodsList[0].name;
        //       return {
        //         ...button,
        //         openType: 'share',
        //         dataShare: {
        //           goodsImg,
        //           goodsName,
        //           groupId,
        //           promotionId,
        //           remainMember,
        //           groupPrice,
        //         },
        //       };
        //     }
        //     return button;
        //   });
        // // 删除订单按钮单独挪到左侧
        // const deleteBtnIndex = buttonsRight.findIndex((b) => b.type === OrderButtonTypes.DELETE);
        // let buttonsLeft = [];
        // if (deleteBtnIndex > -1) {
        //   buttonsLeft = buttonsRight.splice(deleteBtnIndex, 1);
        // }
        // console.log();
        // this.setData({
        //   buttons: {
        //     right: buttonsRight,
        //   },
        // });
      },
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
    buttons: [[{ primary: false, type: 2, name: "取消订单" }, { primary: true, type: 1, name: "付款" }], [{ primary: false, type: 2, name: "取消订单" }, { primary: true, type: 9, name: "再次购买" }], [{ primary: true, type: 3, name: "确认收货" }], [], [{ primary: false, type: 4, name: "申请售后" }, { primary: true, type: 6, name: "评价" }]],
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onOrderBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      console.log('--type--', type);
      switch (type) {
        case 2:
          this.onCancel(this.data.order);
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
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了取消订单',
        icon: 'check-circle',
      });
    },

    onConfirm() {
      Dialog.confirm({
        title: '确认是否已经收到货？',
        content: '',
        confirmBtn: '确认收货',
        cancelBtn: '取消',
      })
        .then(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '你确认了确认收货',
            icon: 'check-circle',
          });
        })
        .catch(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '你取消了确认收货',
            icon: 'check-circle',
          });
        });
    },

    onPay() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了去支付',
        icon: 'check-circle',
      });
    },

    onBuyAgain() {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了再次购买',
        icon: 'check-circle',
      });
    },

    onApplyRefund(order) {
      // const goods = order.goodsList[this.properties.goodsIndex];
      // const params = {
      //   orderNo: order.orderNo,
      //   skuId: goods?.skuId ?? '19384938948343',
      //   spuId: goods?.spuId ?? '28373847384343',
      //   orderStatus: order.status,
      //   logisticsNo: order.logisticsNo,
      //   price: goods?.price ?? 89,
      //   num: goods?.num ?? 89,
      //   createTime: order.createTime,
      //   orderAmt: order.totalAmount,
      //   payAmt: order.amount,
      //   canApplyReturn: true,
      // };
      // const paramsStr = Object.keys(params)
      //   .map((k) => `${k}=${params[k]}`)
      //   .join('&');
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
      const imgUrl = order?.goodsList?.[0]?.thumb;
      const title = order?.goodsList?.[0]?.title;
      const specs = order?.goodsList?.[0]?.specs;
      wx.navigateTo({
        url: `/pages/goods/comments/create/index?specs=${specs}&title=${title}&orderNo=${order?.orderNo}&imgUrl=${imgUrl}`,
      });
    },
  },
});
