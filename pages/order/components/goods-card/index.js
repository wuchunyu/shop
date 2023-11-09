Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true,
  },
  intersectionObserverContext: null,

  externalClasses: [
    'card-class',
    'title-class',
    'desc-class',
    'num-class',
    'thumb-class',
    'specs-class',
    'price-class',
    'origin-price-class',
    'price-prefix-class',
  ],

  relations: {
    '../order-card/index': {
      type: 'ancestor',
      linked(target) {
        this.parent = target;
      },
    },
  },

  properties: {
    hidden: {
      // 设置为null代表不做类型转换
      type: null,
      value: false,
      observer(hidden) {
        // null就是代表没有设置，没有设置的话不setData，防止祖先组件触发的setHidden操作被覆盖
        if (hidden !== null) {
          this.setHidden(!!hidden);
        }
      },
    },
    data: {
      type: Object,
      observer(goods) {
        // 敲定换行数量默认值
        if (goods.lineClamp === undefined || goods.lineClamp <= 0) {
          // tag数组长度 大于0 且 可见
          // 指定换行为1行
          if ((goods.tags?.length || 0) > 0 && !goods.hideKey?.tags) {
            goods.lineClamp = 1;
          } else {
            goods.lineClamp = 2;
          }
        }
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
    thumbWidth: Number,
    thumbHeight: Number,
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
    specsIcon: {
      type: String,
      value: 'expand_more',
    },
  },

  data: {
    hiddenInData: false,
    goods: {},
  },

  lifetimes: {
    ready() {
      // this.init();
    },
    detached() {
      // this.clear();
    },
  },

  methods: {
    clickHandle() {
      this.triggerEvent('click', { goods: this.data.goods });
    },
    clickThumbHandle() {
      this.triggerEvent('thumb', { goods: this.data.goods });
    },
    clickTagHandle(evt) {
      const { index } = evt.currentTarget.dataset;
      this.triggerEvent('tag', { goods: this.data.goods, index });
    },

    setHidden(hidden) {
      this.setData({ hiddenInData: !!hidden });
    },
  },
});
