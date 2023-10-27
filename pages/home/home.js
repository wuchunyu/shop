import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../utils/util';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    swiperImageProps: {
      mode: 'scaleToFill'
    },
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
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
              pageLoading: false,
            });
            _this.loadGoodsList(true);
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
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

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/fetchGoodsList', {}, 'GET', res.code).then(res => {
            // 获取商品列表
            const nextList = res.data;
            _this.setData({
              goodsList: fresh ? nextList : _this.data.goodsList.concat(nextList),
              goodsListLoadStatus: 0,
            });

            _this.goodListPagination.index = pageIndex;
            _this.goodListPagination.num = pageSize;
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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
  },

  goodListAddCartHandle() {
    console.log('--goodListAddCartHandle--');
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index'
    });
  },

  navToActivityDetail({
    detail
  }) {
    const {
      index: promotionID = 0
    } = detail || {};
    // wx.navigateTo({
    //   url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    // });
  },
});