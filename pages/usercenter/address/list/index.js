/* eslint-disable no-param-reassign */
import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../../../utils/util';

Page({
  data: {
    addressList: [],
    deleteID: '',
    showDeleteConfirm: false,
    isOrderSure: false,
  },

  /** 选择模式 */
  selectMode: false,
  /** 是否已经选择地址，不置为true的话页面离开时会触发取消选择行为 */
  hasSelect: false,

  onLoad(query) {
    const {
      selectMode = '', isOrderSure = '', id = ''
    } = query;
    this.setData({
      isOrderSure: !!isOrderSure,
      id,
    });
    this.selectMode = !!selectMode;
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
      this.setData({
        deleteID: id,
        showDeleteConfirm: true
      });
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
  deleteAddressHandle(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      addressList: this.data.addressList.filter((address) => address.id !== id),
      deleteID: '',
      showDeleteConfirm: false,
    });
  },
  editAddressHandle({
    detail
  }) {
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?detail=${JSON.stringify(detail)}`
    });
  },
  selectHandle({
    detail
  }) {
    if (this.selectMode) {
      this.hasSelect = true;
      wx.navigateBack({
        delta: 1
      });
    } else {
      this.editAddressHandle({
        detail
      });
    }
  },
  createHandle() {
    wx.navigateTo({
      url: '/pages/usercenter/address/edit/index'
    });
  },
});