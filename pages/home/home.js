import {
  request
} from '../../utils/util';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    tabId: '',
    searchValue: '',
    goodsList: [],
    is_next: true,
    pageLoading: false,
  },

  goodListPagination: {
    index: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    console.log('--onReachBottom--');
    if (this.data.is_next) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    let _this = this;
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          request('/fetchHome', {}, 'GET', res.code).then(res => { // 首页轮播图、分类名称
            const {
              swiper,
              tabList
            } = res.data;
            _this.setData({
              tabList,
              imgSrcs: swiper,
              tabId: tabList[0].tabId,
              pageLoading: false,
            });
            _this.loadGoodsList(true);
          })
        }
      }
    })
  },

  tabChangeHandle(e) {
    this.setData({
      tabId: e.detail.value
    })
    this.loadGoodsList(true);
  },

  handleSubmit(e) {
    this.setData({
      searchValue: e.detail.value
    })
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    let _this = this;
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    let pageIndex = this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 1;
    }
    console.log('--pageIndex--', pageIndex);
    const { tabId, searchValue } = this.data;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchGoodsList', { pageSize: 20, pageIndex, tabId, searchValue }, 'GET', res.code).then(res => {
            console.log('--0--');
            // 获取商品列表
            const nextList = res.data.list;
            _this.setData({
              goodsList: fresh ? nextList : _this.data.goodsList.concat(nextList),
              is_next: res.data.is_next
            });
            _this.goodListPagination.index = pageIndex;
          })
        }
      }
    })
  },

  goodListClickHandle(e) {
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  }
});