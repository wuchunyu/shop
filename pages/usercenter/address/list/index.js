/* eslint-disable no-param-reassign */
import Toast from 'tdesign-miniprogram/toast/index';
import {
  resolveAddress,
  rejectAddress
} from './util';
import {
  getUrl,
  postUrl
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
  onUnload() {
    if (this.selectMode && !this.hasSelect) {
      rejectAddress();
    }
  },
  getAddressList() {
    const {
      id
    } = this.data;
    getUrl('/fetchDeliveryAddressList').then(res => {
      const addressList = res.data;
      addressList.forEach((address) => {
        if (address.id === id) {
          address.checked = true;
        }
      });
      this.setData({
        addressList
      });
    })
  },
  getWXAddressHandle() {
    wx.chooseAddress({
      success: (res) => {
        if (res.errMsg.indexOf('ok') === -1) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: res.errMsg,
            icon: '',
            duration: 1000,
          });
          return;
        }
        Toast({
          context: this,
          selector: '#t-toast',
          message: '添加成功',
          icon: '',
          duration: 1000,
        });
        const {
          length: len
        } = this.data.addressList;
        this.setData({
          [`addressList[${len}]`]: {
            name: res.userName,
            phone: res.telNumber,
            address: `${res.provinceName}${res.cityName}${res.countryName}${res.detailInfo}`,
            isDefault: 0,
            tag: '微信地址',
            id: len,
          },
        });
      },
    });
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
    const {
      id
    } = detail || {};
    wx.navigateTo({
      url: `/pages/usercenter/address/edit/index?id=${id}`
    });
  },
  selectHandle({
    detail
  }) {
    if (this.selectMode) {
      this.hasSelect = true;
      resolveAddress(detail);
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