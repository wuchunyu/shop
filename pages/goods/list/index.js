import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../../utils/util';

const initFilters = {
  overall: 1,
  sorts: '',
};

Page({
  data: {
    sorts: '',
    overall: 1,
    tabList: [],
    tabId: '',
    searchValue: '',
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
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

  onShow() {
    // this.getTabBar().init();
  },

  onLoad(option) {
    let item = JSON.parse(option.item);
    this.setData({
      tabId: item.groupId
    })
    wx.setNavigationBarTitle({
      title: item.name,
    })
    this.init();
  },

  // onLoad() {
  //   this.init();
  // },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  handleFilterChange(e) {
    const { overall, sorts } = e.detail;
    this.setData({
      sorts,
      overall,
    });
    this.init(true);
  },

  init() {
    this.loadGoodsList(true);
  },

  tabChangeHandle(e) {
    this.setData({
      tabId: e.detail.value
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

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }
    const { tabId, searchValue } = this.data;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchGoodsList', { pageSize, pageIndex, tabId, searchValue }, 'GET', res.code).then(res => {
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

  navToSearchPage() {
    // wx.navigateTo({
    //   url: '/pages/goods/search/index'
    // });
  },
});