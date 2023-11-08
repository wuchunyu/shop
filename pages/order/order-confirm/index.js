import {
  request
} from '../../../utils/util';

Page({
  data: {
    remarks: '',
    orderCardList: [], // 仅用于商品卡片展示
    address: {},
    total: 0,
    totalPrice: 0,
  },
  onLoad(options) {
    const orderCardList = JSON.parse(options.orderCardList);
    console.log('--orderCardList--', orderCardList);
    let total = 0, totalPrice = 0;
    orderCardList.forEach(item => {
      total = total + item.stockQuantity;
      totalPrice = item.stockQuantity * item.price;
    })
    this.setData({
      total,
      totalPrice,
      orderCardList
    })
    this.getAddress();
  },
  getAddress() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/fetchDeliveryAddressList', { userId: 123 }, 'GET', res.code).then(res => {
            if (res.ec === 200) {
              _this.setData({
                address: res.data[0]
              })
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onGotoAddress() {
    let id = '';

    wx.navigateTo({
      url: `/pages/usercenter/address/list/index?selectMode=1&isOrderSure=1${id}`,
    });
  },
  onNotes(e) {
    // 添加备注信息
    this.setData({
      dialogShow: true,
    });
  },
  onInput(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  onNoteConfirm() {
    // 备注信息 确认按钮
    this.setData({
      dialogShow: false,
    });
  },
  onNoteCancel() {
    // 备注信息 取消按钮
    this.setData({
      remarks: '',
      dialogShow: false,
    });
  },

  // 提交订单
  submitOrder() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          let params = {
            address_id: _this.data.address.address_id,
            commodity: [],
            remarks: _this.data.remarks,
          };

          _this.data.orderCardList.forEach(item => {
            let commoditys = { specId: [] };
            console.log(item);
            commoditys.spuId = item.spuId;
            commoditys.stockQuantity = item.stockQuantity;
            item.specList.forEach(v => {
              commoditys.specId.push(v.specId);
            })
            params.commodity.push(commoditys)
          })
          console.log(params);
          request('/commitPay', params, 'POST', res.code).then(res => { //分类 商品列表
            console.log(res);
            if (res.ec === 200) {
              // 跳转支付结果页面
              wx.redirectTo({ url: `/pages/order/pay-result/index` });
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
});
