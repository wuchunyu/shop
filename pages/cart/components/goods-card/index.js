Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true,
  },
  // intersectionObserverContext: null,

  // externalClasses: [
  //   'card-class',
  //   'title-class',
  //   'desc-class',
  //   'num-class',
  //   'thumb-class',
  //   'specs-class',
  //   'price-class',
  //   'origin-price-class',
  //   'price-prefix-class',
  // ],

  properties: {
    data: {
      type: Object,
      observer(goods) {
        // 有ID的商品才渲染
        if (!goods) {
          return;
        }
        goods.lineClamp = 2;
        this.setData({ goods });
      },
    },
    layout: {
      type: String,
      value: 'horizontal',
    },
    thumbMode: {
      type: String,
      value: 'aspectFill',
    },
    priceFill: {
      type: Boolean,
      value: true,
    },
    currency: {
      type: String,
      value: '¥',
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    centered: {
      type: Boolean,
      value: false,
    },
    specsIcon: {
      type: String,
      value: 'expand_more',
    },
    addCartIcon: {
      type: String,
      value: 'cart',
    },
  },

  data: {
    goods: {},
  },

  methods: {
    clickHandle() {
      this.triggerEvent('click', { goods: this.data.goods });
    },
    clickThumbHandle() {
      this.triggerEvent('thumb', { goods: this.data.goods });
    },
  },
});
