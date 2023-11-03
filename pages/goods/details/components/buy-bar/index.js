Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: { multipleSlots: true },

  properties: {
    jumpArray: {
      type: Array,
      value: [],
    },
    isSlotButton: {
      type: Boolean,
      value: false,
    }, // 是否开启按钮插槽
    minDiscountPrice: {
      type: String,
      value: '',
    },
    minSalePrice: {
      type: String,
      value: '',
    },
  },

  data: {
    fillPrice: false,
  },

  methods: {
    toAddCart() {
      this.triggerEvent('toAddCart');
    },

    toBuyNow(e) {
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const { url } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});
