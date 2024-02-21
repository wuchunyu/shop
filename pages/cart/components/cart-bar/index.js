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
    isAllSelected: Boolean,
  },

  methods: {
    handleSelectAll() {
      this.triggerEvent('handleSelectAll', {
        isAllSelected: !this.properties.isAllSelected,
      });
    },
    handleToSettle() {
      if (this.properties.totalAmount == 0) return;
      this.triggerEvent('handleToSettle');
    },
  },
});
