import Toast from 'tdesign-miniprogram/toast/index';

Component({
  externalClasses: ['wr-class'],
  properties: {
    storeGoods: {
      type: Array,
    },
    thumbWidth: { type: null },
    thumbHeight: { type: null },
  },

  data: {
    // isShowSpecs: false,
    currentGoods: {},
    isShowToggle: false,
  },

  methods: {
    // 删除商品
    deleteGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('delete', { spuId: goods.spuId });
    },

    // 选中商品
    selectGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('selectgoods', {
        spuId: goods.spuId,
        isSelected: !goods.isSelected,
      });
    },

    changeStepper(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('changequantity', { value, spuId: goods.spuId });
    },

    goGoodsDetail(e) {
      const { goods } = e.currentTarget.dataset;
      console.log('--goGoodsDetail--', goods);
      this.triggerEvent('goodsclick', { goods });
    },
  },
});
