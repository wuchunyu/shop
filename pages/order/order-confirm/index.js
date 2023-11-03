import Toast from 'tdesign-miniprogram/toast/index';
import { getAddressPromise } from '../../usercenter/address/list/util';
import {
  request
} from '../../../utils/util';

Page({
  data: {
    placeholder: '',
    orderCardList: [], // 仅用于商品卡片展示
    notesPosition: 'center',
    storeInfoList: [],
    userAddress: null,
    total: 0,
    totalPrice: 0,
  },
  noteInfo: [],
  tempNoteInfo: [],
  onLoad(options) {
    console.log('----00---', JSON.parse(options.orderCardList));
    let orderCardList = JSON.parse(options.orderCardList);
    let total = 0, totalPrice = 0;
    orderCardList.forEach(item => {
      total = total + item.buyNum;
      totalPrice = item.buyNum * item.price;
    })
    this.setData({
      total,
      totalPrice,
      orderCardList
    })
  },
  onShow() {
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
      placeholder: e.detail.value
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
      placeholder: '',
      dialogShow: false,
    });
  },

  // 提交订单
  submitOrder() {
  },

  hide() {
    // 隐藏 popup
    this.setData({
      'settleDetailData.abnormalDeliveryGoodsList': [],
    });
  }
});
