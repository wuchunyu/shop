Component({
  externalClasses: ['wr-class', 'symbol-class', 'decimal-class'],
  properties: {
    price: {
      type: null,
      value: '',
      observer(price) {
        this.format(price);
      },
    }, // 价格, 以分为单位
    type: {
      type: String,
      value: '', //
    }, //  main 粗体, lighter 细体, mini 黑色, del 中划线, delthrough 中划线，包括货币符号
    lineThroughWidth: {
      type: null,
      value: '0.12em',
    }, // 划线价线条高度
  },

  data: {
    price: [],
  },

  methods: {
    format(price) {
      console.log('--price--', price);
      this.setData({ price });
    },
  },
});
