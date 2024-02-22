/* eslint-disable no-param-reassign */
import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../../../utils/util';
const app = getApp();

Page({
  data: {
    addressList: [],
    type: '0',
    address_id: ''
  },

  onLoad(query) {
    const { type = '0' } = query;
    this.setData({
      type,
      address_id: app.globalData.address.address_id
    })
    this.init();
  },

  init() {
    this.getAddressList();
  },
  getAddressList() {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          request('/fetchDeliveryAddressList', { userId: 123 }, 'GET', res.code).then(res => {
            if (res.ec === 200) {
              _this.setData({
                addressList: res.data
              })
            }
          });
        }
      }
    })
  },
  confirmDeleteHandle({
    detail
  }) {
    const {
      id
    } = detail || {};
    if (id !== undefined) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '地址删除成功',
        theme: 'success',
        duration: 1000,
      });
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '需要组件库发新版才能拿到地址ID',
        icon: '',
        duration: 1000,
      });
    }
  },
  selectaddress(e) {
    this.setData({
      address_id: e.currentTarget.dataset.address.address_id
    })
    app.globalData.address = e.currentTarget.dataset.address;
    wx.navigateBack({ delta: 1 });
  },
  deleteAddressHandle(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      addressList: this.data.addressList.filter((address) => address.id !== id),
    });
  },
  editAddressHandle({
    detail
  }) {
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?detail=${JSON.stringify(detail)}`
    });
  },
  createHandle() {
    wx.navigateTo({
      url: '/pages/usercenter/address/edit/index'
    });
  },
});