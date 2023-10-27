import {
  request
} from '../../../utils/util';
const app = getApp()

Page({
  data: {
    historyWords: [],
    popularWords: [],
    searchValue: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
  },

  deleteType: 0,
  deleteIndex: '',

  onShow() {
    this.queryHistory();
    this.queryPopular();
  },

  onLoad() {
    app.watch('searchValue', this.watchBack);
  },

  watchBack(name, value) {
    this.setData({ searchValue: value })
  },

  queryHistory() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/getSearchHistory', {}, 'GET', res.code).then(res => { //获取搜索历史
            this.setData({
              historyWords: res.data
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  queryPopular() {
    getUrl('/getSearchPopular').then(res => { // 热门搜索
      this.setData({
        popularWords: res.data
      });
    });
  },

  confirm() {
    const {
      historyWords
    } = this.data;
    const {
      deleteType,
      deleteIndex
    } = this;
    historyWords.splice(deleteIndex, 1);
    if (deleteType === 0) {
      this.setData({
        historyWords,
        dialogShow: false,
      });
    } else {
      this.setData({
        historyWords: [],
        dialogShow: false
      });
    }
  },

  close() {
    this.setData({
      dialogShow: false
    });
  },

  handleClearHistory() {
    const {
      dialog
    } = this.data;
    this.deleteType = 1;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除所有历史记录',
      },
      dialogShow: true,
    });
  },

  deleteCurr(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const {
      dialog
    } = this.data;
    this.deleteIndex = index;
    this.setData({
      dialog: {
        ...dialog,
        message: '确认删除当前历史记录',
        deleteType: 0,
      },
      dialogShow: true,
    });
  },

  handleHistoryTap(e) {
    const {
      historyWords
    } = this.data;
    const {
      dataset
    } = e.currentTarget;
    const _searchValue = historyWords[dataset.index || 0] || '';
    if (_searchValue) {
      app.globalData.searchValue = _searchValue
      wx.navigateTo({
        url: `/pages/goods/result/index?searchValue=${_searchValue}`,
      });
    }
  },

  clearSearch() {
    app.globalData.searchValue = ''
  },

  handleSubmit(e) {
    console.log(e);
    const {
      value
    } = e.detail;
    if (value.length === 0) return;
    app.globalData.searchValue = value;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });
  },
});