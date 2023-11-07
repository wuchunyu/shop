Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    totalAmount: {
      type: Number,
      value: 1,
    },
    bottomHeight: {
      type: Number,
      value: 100,
    },
    fixed: Boolean,
  },
  data: {
    isDisabled: false,
  },

  methods: {
    handleSelectAll() {
      const { isAllSelected } = this.data;
      this.setData({
        isAllSelected: !isAllSelected,
      });
      this.triggerEvent('handleSelectAll', {
        isAllSelected: isAllSelected,
      });
    },
    handleToSettle() {
      if (this.data.isDisabled) return;
      this.triggerEvent('handleToSettle');
    },
  },
});
