Page({
  data: {
    detail: null,
    storeInfoList: [],
    storeInfoStr: '',
    showStoreInfoList: false,
  },

  id: '',

  onLoad(query) {
    const id = parseInt(query.id);
    this.id = id;
    this.getGoodsList(id);
  },

  navGoodListHandle() {
    wx.navigateTo({
      url: `/pages/coupon/coupon-activity-goods/index?id=${this.id}`,
    });
  },
});
