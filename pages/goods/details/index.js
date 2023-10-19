import Toast from 'tdesign-miniprogram/toast/index';
import {
  getUrl,
  postUrl
} from '../../../utils/util';

const fetchGood = function (spuId) {
  return postUrl('/fetchGood', {
    spuId
  }); // 获取指定商品信息
}

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
    isShowPromotionPop: false,
    recLeftImg,
    recRightImg,
    details: {},
    goodsTabArray: [{
      name: '商品',
      value: '', // 空字符串代表置顶
    },
    {
      name: '详情',
      value: 'goods-page',
    },
    ],
    storeLogo: `${imgPrefix}common/store-logo.png`,
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
    isStock: true,
    cartNum: 0,
    // soldout: false,
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
    maxSalePrice: 0,
    list: [],
    spuId: '',
    navigation: {
      type: 'fraction'
    },
    current: 0,
    duration: 500,
    interval: 5000,
    soldNum: 0, // 已售数量
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

  showCurImg(e) {
    const {
      index
    } = e.detail;
    const {
      images
    } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
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
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
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
    const {
      isAllSelectedSku,
      buyNum
    } = this.data;
    if (!isAllSelectedSku) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请选择规格',
        icon: '',
        duration: 1000,
      });
      return;
    }
    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      storeId: '1',
      spuId: this.data.spuId,
      goodsName: this.data.details.title,
      price: this.data.details.minSalePrice,
      primaryImage: this.data.details.primaryImage,
      spuId: this.data.details.spuId,
      thumb: this.data.details.primaryImage,
      title: this.data.details.title,
    };
    let urlQueryStr = obj2Params({
      goodsRequestList: JSON.stringify([query]),
    });
    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    const path = `/pages/order/order-confirm/index${urlQueryStr}`;
    wx.navigateTo({
      url: path,
    });
  },

  specsConfirm() {
    const {
      buyType
    } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },

  closePromotionPopup() {
    this.setData({
      isShowPromotionPop: false,
    });
  },

  promotionChange(e) {
    const {
      index
    } = e.detail;
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${index}`,
    });
  },

  getDetail(spuId) {
    Promise.all([fetchGood(spuId)]).then((res) => {
      const details = res[0].data;
      const skuArray = [];
      const {
        skuList,
        primaryImage,
        minSalePrice,
        maxSalePrice,
        maxLinePrice,
        soldNum,
      } = details;
      skuList.forEach((item) => {
        skuArray.push({
          quantity: item.stockInfo ? item.stockInfo.stockQuantity : 0
        });
      });
      const promotionArray = [];
      this.setData({
        details,
        isStock: details.spuStockQuantity > 0,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        maxLinePrice: maxLinePrice ? parseInt(maxLinePrice) : 0,
        minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
        list: promotionArray,
        skuArray: skuArray,
        primaryImage,
        soldNum,
      });
    });
  },

  async getCommentsList() {
    try {
      const data = await getUrl('/getGoodsDetailsCommentList');
      const {
        homePageComments
      } = data.data;
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
      this.setData(nextState);

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
      const data = await getUrl('/getGoodsDetailsCommentsCount');
      const {
        badCount,
        commentCount,
        goodCount,
        goodRate,
        hasImageCount,
        middleCount,
      } = data.data;
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
      this.setData(nextState);

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