import {
  request
} from '../../../utils/util';
const app = getApp();

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
    let total = 0, totalPrice = 0;
    orderCardList.forEach(item => {
      total = total + item.stockQuantity;
      totalPrice = totalPrice + item.stockQuantity * item.price;
    })
    this.setData({
      total,
      totalPrice,
      orderCardList
    })
    this.getAddress();
  },
  onShow() {
    if (Object.values(app.globalData.address).length !== 0) {
      this.setData({
        address: app.globalData.address
      })
    }
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
                address: Object.values(app.globalData.address).length !== 0 ? app.globalData.address : res.data[0]
              })
            }
          });
        }
      }
    })
  },
  onGotoAddress() {
    app.globalData.address = this.data.address;
    wx.navigateTo({
      url: `/pages/usercenter/address/list/index?type=true`,
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
            if (item.cartId) {
              commoditys.cartId = item.cartId;
            } else {
              commoditys.spuId = item.spuId;
            }
            commoditys.stockQuantity = item.stockQuantity;
            item.specList.forEach(v => {
              commoditys.specId.push(v.specId);
            })
            params.commodity.push(commoditys)
          })
          request('/commitPay', params, 'POST', res.code).then(res => { //分类 商品列表
            if (res.ec === 200) {
              // 跳转支付结果页面
              wx.redirectTo({ url: `/pages/order/pay-result/index` });
            }
          });
        }
      }
    })
  }
});
