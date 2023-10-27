import Toast from 'tdesign-miniprogram/toast/index';
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
    buttonType: 1,
    buyNum: 1,
    selectedAttrStr: '',
    skuArray: [],
    primaryImage: '',
    specImg: '',
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    buyType: 0,
    operateType: 0,
    selectSkuSellsPrice: 0,
    maxLinePrice: 0,
    minSalePrice: 0,
    list: [],
    spuId: '',
    navigation: {
      type: 'fraction'
    },
    current: 0,
    soldNum: 0, // 已售数量
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  showSkuSelectPopup(type) {
    console.log('--showSkuSelectPopup--', type);
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

  chooseSpecItem(e) {
    const {
      specList
    } = this.data.details;
    const {
      selectedSku,
      isAllSelectedSku
    } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  getSkuItem(specList, selectedSku) {
    const {
      skuArray,
      primaryImage
    } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item) => {
      selectedAttrStr += `，${item.specValue}  `;
    });
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    // if (skuItem) {
    //   this.setData({
    //     selectItem: skuItem,
    //     selectSkuSellsPrice: skuItem.price || 0,
    //   });
    // } else {
    //   this.setData({
    //     selectItem: null,
    //     selectSkuSellsPrice: 0,
    //   });
    // }
    // this.setData({
    //   specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    // });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = skuValues.filter((value) => {
          return value.specValueId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },

  addCart() {
    console.log('--addCart--');
    const {
      isAllSelectedSku
    } = this.data;
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku ? '点击加入购物车' : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },

  gotoBuy(type) {
    console.log('--gotoBuy--');
    const {
      buyNum
    } = this.data;
    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      spuId: this.data.spuId,
      goodsName: this.data.details.title,
      price: this.data.details.minSalePrice,
      primaryImage: this.data.details.primaryImage,
      spuId: this.data.details.spuId,
      thumb: this.data.details.primaryImage,
      title: this.data.details.title,
    };
    console.log('--query--', query);
    let urlQueryStr = obj2Params({
      goodsRequestList: JSON.stringify([query]),
    });

    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    console.log('--urlQueryStr--', urlQueryStr);
    // const path = `/pages/order/order-confirm/index${urlQueryStr}`;
    // wx.navigateTo({
    //   url: path,
    // });
  },

  specsConfirm() {

    const {
      buyType
    } = this.data;
    console.log('--specsConfirm--', buyType);
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    this.handlePopupHide();
  },

  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
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
            console.log('--getDetail--', res);
            const details = res.data;
            const skuArray = [];
            const {
              skuList,
              primaryImage,
              minSalePrice,
              maxLinePrice,
              soldNum,
            } = details;
            skuList.forEach((item) => {
              console.log('--quantity--', item.stockInfo, item.stockInfo.stockQuantity, {
                quantity: item.stockInfo ? item.stockInfo.stockQuantity : 0
              });
              skuArray.push({
                quantity: item.stockInfo ? item.stockInfo.stockQuantity : 0
              });
            });
            const promotionArray = [];
            _this.setData({
              details,
              maxLinePrice: maxLinePrice ? parseInt(maxLinePrice) : 0,
              minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
              list: promotionArray,
              skuArray: skuArray,
              primaryImage,
              soldNum,
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  async getCommentsList() {
    try {
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
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    } catch (error) {
      console.error('comments error:', error);
    }
  },

  onShareAppMessage() {
    // 自定义的返回信息
    const {
      selectedAttrStr
    } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    const customInfo = {
      imageUrl: this.data.details.primaryImage,
      title: this.data.details.title + shareSubTitle,
      path: `/pages/goods/details/index?spuId=${this.data.spuId}`,
    };
    return customInfo;
  },

  /** 获取评价统计 */
  async getCommentsStatistics() {
    try {
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
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    } catch (error) {
      console.error('comments statiistics error:', error);
    }
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