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

  data: {},

  methods: {
    // 删除商品
    deleteGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('delete', { cartId: goods.cartId });
    },

    // 选中商品
    selectGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('selectgoods', {
        cartId: goods.cartId,
        isSelected: !goods.isSelected,
      });
    },

    changeStepper(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('changequantity', { value, cartId: goods.cartId });
    },

    goGoodsDetail(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('goodsclick', { goods });
    },
  },
});
