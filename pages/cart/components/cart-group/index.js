import Toast from 'tdesign-miniprogram/toast/index';

Component({
  externalClasses: ['wr-class'],
  properties: {
    storeGoods: {
      type: Array,
      observer(storeGoods) {
        for (const store of storeGoods) {
          for (const activity of store.promotionGoodsList) {
            for (const goods of activity.goodsPromotionList) {
              goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
            }
          }
          for (const goods of store.shortageGoodsList) {
            goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
          }
        }

        this.setData({ _storeGoods: storeGoods });
      },
    },
    thumbWidth: { type: null },
    thumbHeight: { type: null },
  },

  data: {
    isShowSpecs: false,
    currentGoods: {},
    isShowToggle: false,
    _storeGoods: [],
  },

  methods: {
    // 删除商品
    deleteGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('delete', { goods });
    },

    // 选中商品
    selectGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('selectgoods', {
        goods,
        isSelected: !goods.isSelected,
      });
    },

    changeQuantity(num, goods) {
      this.triggerEvent('changequantity', {
        goods,
        quantity: num,
      });
    },
    changeStepper(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      let num = value;
      if (value > goods.stack) {
        num = goods.stack;
      }
      // this.changeQuantity(num, goods);
    },

    input(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      const num = value;
      this.changeQuantity(num, goods);
    },

    goGoodsDetail(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('goodsclick', { goods });
    },
  },
});
