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
  data: {
    isDisabled: false,
  },

  methods: {
    handleSelectAll() {
      this.triggerEvent('handleSelectAll', {
        isAllSelected: !this.properties.isAllSelected,
      });
    },
    handleToSettle() {
      if (this.data.isDisabled) return;
      this.triggerEvent('handleToSettle');
    },
  },
});
