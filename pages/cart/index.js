import {
  request
} from '../../utils/util';

Page({
  data: {
    cartGroupData: null,
    selectedGoodsCount: 0,
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.refreshData();
  },

  refreshData() {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchCartGroupData', {}, 'GET', res.code).then(res => {
            const cartGroupData = res.data;
            _this.setData({
              cartGroupData
            });
            _this.onselectedGoodsCount();
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onGoodsSelect(e) {
    const {
      cartId,
      isSelected,
    } = e.detail;
    this.data.cartGroupData.forEach(item => {
      if (item.cartId == cartId) {
        item.isSelected = isSelected;
      }
    })
    this.setData({
      cartGroupData: this.data.cartGroupData
    })
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/setIsSelected', { cartId, isSelected: isSelected ? 1 : 0 }, 'POST', res.code).then(res => {
            _this.onselectedGoodsCount();
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onQuantityChange(e) {
    // 更改购物车 选择数量
    const {
      cartId,
      value,
    } = e.detail;
    this.data.cartGroupData.forEach(item => {
      if (item.cartId == cartId) {
        item.stockQuantity = value;
      }
    })
    this.setData({
      cartGroupData: this.data.cartGroupData
    })
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/setStockQuantity', { cartId, stockQuantity: value }, 'POST', res.code).then(res => {
            _this.onselectedGoodsCount();
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  goGoodsDetail(e) {
    const {
      spuId
    } = e.detail.goods;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  onGoodsDelete(e) {
    const { spuId } = e.detail;
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onSelectAll(e) {
    const { isAllSelected } = e.detail;
    this.data.cartGroupData.forEach(item => {
      item.isSelected = isAllSelected;
    })
    this.setData({
      cartGroupData: this.data.cartGroupData,
      isAllSelected
    })
    this.onselectedGoodsCount();
  },

  onselectedGoodsCount() {
    let selectedGoodsCount = 0, isAllSelected = true;
    this.data.cartGroupData.forEach(item => {
      if (item.isSelected == true || item.isSelected == 1) {
        selectedGoodsCount = selectedGoodsCount + (item.price * item.stockQuantity);
      } else {
        isAllSelected = false;
      }
    })

    this.setData({
      selectedGoodsCount,
      isAllSelected
    })
  },

  onToSettle() {
    wx.navigateTo({
      url: `/pages/order/order-confirm/index?orderCardList=${JSON.stringify(this.data.cartGroupData)}`
    });
  },
  onGotoHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
});