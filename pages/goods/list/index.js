import Toast from 'tdesign-miniprogram/toast/index';
import {
  getUrl,
  postUrl
} from '../../../utils/util';

const initFilters = {
  overall: 1,
  sorts: '',
};

let item = null;
Page({
  data: {
    goodsList: [],
    sorts: '',
    overall: 1,
    filter: initFilters,
  },

  onLoad(option) {
    console.log('--option--', JSON.parse(option.item));
    item = JSON.parse(option.item);
    wx.setNavigationBarTitle({
      title: item.name,
    })
    this.init(true);
  },

  handleFilterChange(e) {
    const { overall, sorts } = e.detail;
    this.setData({
      sorts,
      overall,
    });
    this.init(true);
  },

  generalQueryData(reset = false) {
    const { filter } = this.data;
    const { sorts, overall } = filter;
    const params = {
      sort: 0, // 0 综合，1 价格
    };

    if (sorts) {
      params.sort = 1;
    }

    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }
    if (reset) return params;
    return {
      ...params,
    };
  },

  async init(reset = true) {
    const params = this.generalQueryData(reset);
    try {
      console.log('--params--', params);
      const result = await getUrl('/fetchGoodsLists', { groupId: item.groupId });
      const { spuList } = result.data;
      this.setData({
        goodsList: spuList,
      });

    } catch (error) {
    }
  },

  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  gotoGoodsDetail(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  confirm() {
    this.setData(
      {
        goodsList: [],
      },
      () => {
        this.init();
      },
    );
  },
});
