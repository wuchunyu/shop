import {
  request
} from '../../../utils/util';

import {
  cdnBase
} from '../../../config/index';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;
const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );

  return result.join('&');
};

Page({
  data: {
    commentsList: [],
    commentsStatistics: {
      badCount: 0,
      commentCount: 0,
      goodCount: 0,
      goodRate: 0,
      hasImageCount: 0,
      middleCount: 0,
    },
    recLeftImg,
    recRightImg,
    details: {},
    jumpArray: [{
      title: '首页',
      url: '/pages/home/home',
      iconName: 'home',
    },
    {
      title: '购物车',
      url: '/pages/cart/index',
      iconName: 'cart',
      showCartNum: true,
    },
    ],
    cartNum: 0,
    stockQuantity: 1,
    isSpuSelectPopupShow: false,
    buyType: 0,
    spuId: '',
    navigation: {
      type: 'fraction'
    },
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const {
      url
    } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  onPageScroll({
    scrollTop
  }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  addCart(item) {
    let dataList = {
      spuId: this.data.spuId,
      stockQuantity: this.data.stockQuantity,
      specId: []
    }
    for (let i of this.data.details.specList) {
      dataList.specId.push(i.specId)
    }
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/addCart', dataList, 'POST', res.code).then(res => {
            if (res.ec == 200) {
              wx.showToast({
                title: '加入成功',
                icon: 'success',
                duration: 2000
              })
            }
          });
        }
      }
    })
  },

  gotoBuy() {
    const {
      stockQuantity
    } = this.data;
    this.handlePopupHide();
    const query = {
      ...this.data.details,
      stockQuantity
    };
    wx.navigateTo({
      url: `/pages/order/order-confirm/index?orderCardList=${JSON.stringify([query])}`
    });
  },

  specsConfirm(item) {
    this.setData({
      details: {
        ...this.data.details,
        specList: item.detail
      }
    });
    const {
      buyType
    } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    this.handlePopupHide();
  },

  changeNum(e) {
    this.setData({
      stockQuantity: e.detail
    });
  },

  promotionChange(e) {
    const {
      index
    } = e.detail;
    // wx.navigateTo({
    //   url: `/pages/promotion-detail/index?promotion_id=${index}`,
    // });
  },

  getDetail(spuId) {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求 
          request('/fetchGood', { spuId }, 'POST', res.code).then(res => {
            _this.setData({
              details: res.data
            });
          });
        }
      }
    })

  },

  getCommentsList() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/getGoodsDetailsCommentList', {}, 'GET', res.code).then(res => { //分类 商品列表
            const {
              homePageComments
            } = res.data;
            const nextState = {
              commentsList: homePageComments.map((item) => {
                return {
                  goodsSpu: item.spuId,
                  userName: item.userName || '',
                  commentScore: item.commentScore,
                  commentContent: item.commentContent || '用户未填写评价',
                  userHeadUrl: item.isAnonymity ?
                    this.anonymityAvatar : item.userHeadUrl || this.anonymityAvatar,
                };
              }),
            };
            _this.setData(nextState);
          });
        }
      }
    })


  },

  /** 获取评价统计 */
  getCommentsStatistics() {
    let _this = this;
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/getGoodsDetailsCommentsCount', {}, 'GET', res.code).then(res => { //分类 商品列表
            const {
              badCount,
              commentCount,
              goodCount,
              goodRate,
              hasImageCount,
              middleCount,
            } = res.data;
            const nextState = {
              commentsStatistics: {
                badCount: parseInt(`${badCount}`),
                commentCount: parseInt(`${commentCount}`),
                goodCount: parseInt(`${goodCount}`),
                /** 后端返回百分比后数据但没有限制位数 */
                goodRate: Math.floor(goodRate * 10) / 10,
                hasImageCount: parseInt(`${hasImageCount}`),
                middleCount: parseInt(`${middleCount}`),
              },
            };
            _this.setData(nextState);
          });
        }
      }
    })


  },

  /** 跳转到评价列表 */
  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/goods/comments/index?spuId=${this.data.spuId}`,
    });
  },

  onLoad(query) {
    const {
      spuId
    } = query;
    this.setData({
      spuId: spuId,
    });
    this.getDetail(spuId);
    this.getCommentsList(spuId);
    this.getCommentsStatistics(spuId);
  },
});