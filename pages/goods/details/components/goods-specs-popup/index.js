/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import Toast from 'tdesign-miniprogram/toast/index';

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  properties: {
    details: {
      type: Object,
      value: {},
      observer(details) {
        if (Object.keys(details).length > 0) {
          this.initData();
        }
      },
    },
    buyType: {
      type: Number,
      value: 0
    },
    show: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    isStock: false,
    buyNum: 1,
    isAllSelectedSku: false,
  },

  methods: {
    initData() {
      this.setData({
        details: this.properties.details
      })
    },

    toChooseItem(e) {
      console.log('--toChooseItem--', e, this.data.details);
      const { specid, title } = e.currentTarget.dataset;
      let { specList } = this.data.details;
      specList.forEach(item => {
        if (item.title === title) {
          item.specId = specid
        }
      })
      this.setData({
        isStock: !specList.some((item) => item['specId'] == ''),
        details: { ...this.data.details, specList }
      })
    },

    handlePopupHide() {
      this.triggerEvent('closeSpecsPopup', {
        show: false,
      });
    },

    specsConfirm() {
      console.log('--buyType--', this.properties.buyType);
      this.triggerEvent('specsConfirm');
    },

    // addCart() {
    //   this.triggerEvent('addCart');
    // },

    handleBuyNumChange(e) {
      const { value } = e.detail;
      this.setData({
        buyNum: value,
      });
    },
  },
});
