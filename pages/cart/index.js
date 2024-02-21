import {
  request
} from '../../utils/util';

Page({
  data: {
    cartData: null,
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
    this.onfetchCartGroupData();
  },

  onfetchCartGroupData() {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchCartGroupData', {}, 'GET', res.code).then(res => {
            const cartData = res.data;
            _this.setData({
              cartData
            });
            _this.onselectedGoodsCount();
          });
        }
      }
    })
  },

  onGoodsSelect(e) {
    console.log('--onGoodsSelect--', e);
    const {
      cartId,
      isSelected,
    } = e.detail;
    this.data.cartData.forEach(item => {
      if (item.cartId == cartId) {
        item.isSelected = isSelected;
      }
    })
    this.setData({
      cartData: this.data.cartData
    })
    console.log('--onGoodsSelect--', this.data.cartData);
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/setIsSelected', { cartId, isSelected: isSelected ? 1 : 0 }, 'POST', res.code).then(res => {
            _this.onselectedGoodsCount();
          });
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
    this.data.cartData.forEach(item => {
      if (item.cartId == cartId) {
        item.stockQuantity = value;
      }
    })
    this.setData({
      cartData: this.data.cartData
    })
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/setStockQuantity', { cartId, stockQuantity: value }, 'POST', res.code).then(res => {
            _this.onselectedGoodsCount();
          });
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
    let _this = this;
    const { cartId } = e.detail;
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗?',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求 
                request('/delCartSelected', { cartId }, 'POST', res.code).then(res => {
                  _this.onfetchCartGroupData();
                });
              }
            }
          })
        }
      }
    })
  },

  onSelectAll(e) {
    const { isAllSelected } = e.detail;
    this.data.cartData.forEach(item => {
      item.isSelected = isAllSelected ? 1 : 0;
    })
    this.setData({
      cartData: this.data.cartData,
      isAllSelected
    })
    this.onselectedGoodsCount();
  },

  onselectedGoodsCount() {
    let selectedGoodsCount = 0, isAllSelected = true;
    this.data.cartData.forEach(item => {
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
    console.log('--onToSettle--', this.data.cartData);
    let orderCardList = [];
    this.data.cartData.forEach(item => {
      if (item.isSelected == 1) {
        orderCardList.push(item)
      }
    })
    wx.navigateTo({
      url: `/pages/order/order-confirm/index?orderCardList=${JSON.stringify(orderCardList)}`
    });
  },
  onGotoHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
});