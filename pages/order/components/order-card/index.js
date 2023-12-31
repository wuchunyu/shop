Component({
  externalClasses: ['wr-class', 'header-class', 'title-class'],

  options: {
    multipleSlots: true,
  },

  relations: {
    '../order-goods-card/index': {
      type: 'descendant',
      linked(target) {
        this.children.push(target);
        // this.setHidden();
      },
      unlinked(target) {
        this.children = this.children.filter((item) => item !== target);
      },
    },
    '../goods-card/index': {
      type: 'descendant',
      linked(target) {
        this.children.push(target);
        // this.setHidden();
      },
      unlinked(target) {
        this.children = this.children.filter((item) => item !== target);
      },
    },
    '../specs-goods-card/index': {
      type: 'descendant',
      linked(target) {
        this.children.push(target);
        // this.setHidden();
      },
      unlinked(target) {
        this.children = this.children.filter((item) => item !== target);
      },
    },
  },

  created() {
    this.children = [];
  },

  properties: {
    order: {
      type: Object,
    },
    hidden: {
      type: Boolean,
    },
  },

  data: {
    orderStatusList: {
      0: '待付款',
      1: '待发货',
      2: '待收货',
      3: '已取消',
      4: '已完成'
    }
  },

  methods: {
    onOrderCardTap() {
      this.triggerEvent('cardtap');
    },
  },
});
