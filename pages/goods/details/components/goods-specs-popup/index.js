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
    },
    buyType: {
      type: Number,
      value: 0
    },
    show: {
      type: Boolean,
      value: false,
    },
    buyNum: {
      type: Number,
      value: 1
    },
  },

  data: {
    isStock: false,
  },

  methods: {
    toChooseItem(e) {
      const { specid, title, specvalue } = e.currentTarget.dataset;
      let { specList } = this.properties.details;
      specList.forEach(item => {
        if (item.title === title) {
          item.specId = specid
          item.specValue = specvalue
        }
      })
      this.setData({
        isStock: !specList.some((item) => item['specId'] == ''),
        details: { ...this.properties.details, specList }
      })
    },

    handlePopupHide() {
      this.triggerEvent('closeSpecsPopup', {
        show: false,
      });
    },

    specsConfirm() {
      this.data.isStock && this.triggerEvent('specsConfirm', this.properties.details.specList);
    },

    changeNum(e) {
      const { value } = e.detail;
      this.triggerEvent('changeNum', value);
    },
  },
});
