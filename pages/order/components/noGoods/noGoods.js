Component({
  properties: {
    settleDetailData: {
      type: Object,
      value: {},
      observer(settleDetailData) {
        const {
          abnormalDeliveryGoodsList,
        } = settleDetailData;
        // 弹窗逻辑   限购  超出配送范围   失效    库存不足;
        const tempList =
          abnormalDeliveryGoodsList ||
          [];

        tempList.forEach((goods, index) => {
          goods.id = index;
          goods.unSettlementGoods &&
            goods.unSettlementGoods.forEach((ele) => {
              ele.name = ele.goodsName;
              ele.imgUrl = ele.image;
            });
        });
        this.setData({
          // settleDetailData,
          goodsList: tempList,
        });
      },
    },
  },

  data: {
    goodList: [],
  },
  methods: {
    onCard(e) {
      const { item } = e.currentTarget.dataset;
      if (item === 'cart') {
        // 购物车
        Navigator.gotoPage('/cart');
      } else if (item === 'orderSure') {
        // 结算页
        this.triggerEvent('change', undefined);
      }
    },
    onDelive() {
      // 修改配送地址
      Navigator.gotoPage('/address', { type: 'orderSure' });
    },
  },
});
