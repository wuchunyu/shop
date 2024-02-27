import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { priceFormat } from '../../../utils/util';
import reasonSheet from '../components/reason-sheet/reasonSheet';

Page({
  query: {},
  data: {
    uploading: false, // 凭证上传状态
    canApplyReturn: true, // 是否可退货
    goodsInfo: [],
    receiptStatusList: [
      { desc: '未收到货', status: 0 },
      { desc: '已收到货', status: 1 },
    ],
    applyReasons: [],
    serviceType: null, // 20-仅退款，10-退货退款
    serviceFrom: {
      returnNum: 1,
      receiptStatus: { desc: '请选择', status: null },
      applyReason: { desc: '请选择', type: null },
      // max-填写上限(单位分)，current-当前值(单位分)，temp输入框中的值(单位元)
      amount: { max: 0, current: 0, temp: 0, focus: false },
      remark: '',
      rightsImageUrls: [],
    },
    maxApplyNum: 2, // 最大可申请售后的商品数
    amountTip: '',
    showReceiptStatusDialog: false,
    validateRes: {
      valid: false,
      msg: '',
    },
    submitting: false,
    inputDialogVisible: false,
    uploadGridConfig: {
      column: 3,
      width: 212,
      height: 212,
    },
    serviceRequireType: '',
  },

  setWatcher(key, callback) {
    let lastData = this.data;
    const keys = key.split('.');
    keys.slice(0, -1).forEach((k) => {
      lastData = lastData[k];
    });
    const lastKey = keys[keys.length - 1];
    this.observe(lastData, lastKey, callback);
  },

  observe(data, k, callback) {
    let val = data[k];
    Object.defineProperty(data, k, {
      configurable: true,
      enumerable: true,
      set: (value) => {
        val = value;
        callback();
      },
      get: () => {
        return val;
      },
    });
  },

  validate() {
    let valid = true;
    let msg = '';
    // 检查必填项
    if (!this.data.serviceFrom.applyReason.type) {
      valid = false;
      msg = '请填写退款原因';
    } else if (!this.data.serviceFrom.amount.current) {
      valid = false;
      msg = '请填写退款金额';
    }
    if (this.data.serviceFrom.amount.current <= 0) {
      valid = false;
      msg = '退款金额必须大于0';
    }
    this.setData({ validateRes: { valid, msg } });
  },

  onLoad(query) {
    console.log('--apply-service--', JSON.parse(query.order));
    this.setData({
      query: JSON.parse(query.order),
      goodsInfo: JSON.parse(query.order).orderItemVOs,
    });
  },

  async refresh() {
    wx.showLoading({ title: 'loading' });
    try {
      const res = await this.getRightsPreview();
      wx.hideLoading();
      const goodsInfo = {
        id: res.data.skuId,
        thumb: res.data.goodsInfo && res.data.goodsInfo.skuImage,
        title: res.data.goodsInfo && res.data.goodsInfo.goodsName,
        spuId: res.data.spuId,
        skuId: res.data.skuId,
        specs: ((res.data.goodsInfo && res.data.goodsInfo.specInfo) || []).map((s) => s.specValue),
        paidAmountEach: res.data.paidAmountEach,
        boughtQuantity: res.data.boughtQuantity,
      };
      this.setData({
        goodsInfo,
        'serviceFrom.amount': {
          max: res.data.refundableAmount,
          current: res.data.refundableAmount,
        },
        'serviceFrom.returnNum': res.data.numOfSku,
        amountTip: `最多可申请退款¥ ${priceFormat(res.data.refundableAmount, 2)}，含发货运费¥ ${priceFormat(
          res.data.shippingFeeIncluded,
          2,
        )}`,
        maxApplyNum: res.data.numOfSkuAvailable,
      });
    } catch (err) {
      wx.hideLoading();
      throw err;
    }
  },

  async getRightsPreview() {
    const { uid, skuId, spuId } = this.query;
    const params = {
      uid,
      skuId,
      spuId,
      numOfSku: this.data.serviceFrom.returnNum,
    };
    const res = await fetchRightsPreview(params);
    return res;
  },

  onApplyOnlyRefund() {
    wx.setNavigationBarTitle({ title: '申请退款' });
    this.setData({ serviceRequireType: 'REFUND_MONEY' });
    this.switchReceiptStatus(0);
  },

  onApplyReturnGoods() {
    wx.setNavigationBarTitle({ title: '申请退货退款' });
    this.setData({ serviceRequireType: 'REFUND_GOODS' });
    const orderStatus = parseInt(this.query.orderStatus);
    Promise.resolve()
      .then(() => {
        if (orderStatus === OrderStatus.PENDING_RECEIPT) {
          return Dialog.confirm({
            title: '订单商品是否已经收到货',
            content: '',
            confirmBtn: '确认收货，并申请退货',
            cancelBtn: '未收到货',
          }).then(() => {
            return dispatchConfirmReceived({
              parameter: {
                logisticsNo: this.query.logisticsNo,
                uid: this.query.uid,
              },
            });
          });
        }
        return;
      })
      .then(() => {
        this.setData({ serviceType: ServiceType.RETURN_GOODS });
        this.switchReceiptStatus(1);
      });
  },

  onApplyReturnGoodsStatus() {
    reasonSheet({
      show: true,
      title: '选择退款原因',
      options: this.data.applyReasons.map((r) => ({
        title: r.desc,
      })),
      showConfirmButton: true,
      showCancelButton: true,
      emptyTip: '请选择退款原因',
    }).then((indexes) => {
      this.setData({
        'serviceFrom.applyReason': this.data.applyReasons[indexes[0]],
      });
    });
  },

  onChangeReturnNum(e) {
    const { value } = e.detail;
    this.setData({
      'serviceFrom.returnNum': value,
    });
  },

  onApplyGoodsStatus() {
    reasonSheet({
      show: true,
      title: '请选择收货状态',
      options: this.data.receiptStatusList.map((r) => ({
        title: r.desc,
      })),
      showConfirmButton: true,
      emptyTip: '请选择收货状态',
    }).then((indexes) => {
      this.setData({
        'serviceFrom.receiptStatus': this.data.receiptStatusList[indexes[0]],
      });
    });
  },

  switchReceiptStatus(index) {
    const statusItem = this.data.receiptStatusList[index];
    // 没有找到对应的状态，则清空/初始化
    if (!statusItem) {
      this.setData({
        showReceiptStatusDialog: false,
        'serviceFrom.receiptStatus': { desc: '请选择', status: null },
        'serviceFrom.applyReason': { desc: '请选择', type: null }, // 收货状态改变时，初始化申请原因
        applyReasons: [],
      });
      return;
    }
    // 仅选中项与当前项不一致时，才切换申请原因列表applyReasons
    if (!statusItem || statusItem.status === this.data.serviceFrom.receiptStatus.status) {
      this.setData({ showReceiptStatusDialog: false });
      return;
    }
    this.setData({
      showReceiptStatusDialog: false,
      'serviceFrom.receiptStatus': statusItem,
      'serviceFrom.applyReason': { desc: '请选择', type: null }, // 收货状态改变时，重置申请原因
      applyReasons: reasons,
    });
  },

  onReceiptStatusDialogConfirm(e) {
    const { index } = e.currentTarget.dataset;
    this.switchReceiptStatus(index);
  },

  // 对输入的值进行过滤
  onAmountInput(e) {
    let { value } = e.detail;
    const regRes = value.match(/\d+(\.?\d*)?/); // 输入中，允许末尾为小数点
    value = regRes ? regRes[0] : '';
    this.setData({ 'serviceFrom.amount.temp': value });
  },

  // 失去焦点时，更严格的过滤并转化为float
  onAmountBlur(e) {
    let { value } = e.detail;
    const regRes = value.match(/\d+(\.?\d+)?/); // 失去焦点时，不允许末尾为小数点
    value = regRes ? regRes[0] : '0';
    value = parseFloat(value) * 100;
    if (value > this.data.serviceFrom.amount.max) {
      value = this.data.serviceFrom.amount.max;
    }
    this.setData({
      'serviceFrom.amount.temp': priceFormat(value),
      'serviceFrom.amount.focus': false,
    });
  },

  onAmountFocus() {
    this.setData({ 'serviceFrom.amount.focus': true });
  },

  onRemarkChange(e) {
    const { value } = e.detail;
    this.setData({
      'serviceFrom.remark': value,
    });
  },

  // 发起申请售后请求
  onSubmit() {
    this.submitCheck().then(() => {
      const params = {
        rights: {
          uid: this.query.uid,
          refundRequestAmount: this.data.serviceFrom.amount.current,
          rightsImageUrls: this.data.serviceFrom.rightsImageUrls,
          rightsReasonDesc: this.data.serviceFrom.applyReason.desc,
          rightsReasonType: this.data.serviceFrom.receiptStatus.status,
          rightsType: this.data.serviceType,
        },
        rightsItem: [
          {
            itemTotalAmount: this.data.goodsInfo.price * this.data.serviceFrom.returnNum,
            rightsQuantity: this.data.serviceFrom.returnNum,
            skuId: this.query.skuId,
            spuId: this.query.spuId,
          },
        ],
        refundMemo: this.data.serviceFrom.remark.current,
      };
      this.setData({ submitting: true });
      // 发起申请售后请求
      dispatchApplyService(params)
        .then((res) => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '申请成功',
            icon: '',
          });

          wx.redirectTo({
            url: `/pages/order/after-service-detail/index?rightsNo=${res.data.rightsNo}`,
          });
        })
        .then(() => this.setData({ submitting: false }))
        .catch(() => this.setData({ submitting: false }));
    });
  },

  submitCheck() {
    return new Promise((resolve) => {
      const { msg, valid } = this.data.validateRes;
      if (!valid) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: msg,
          icon: '',
        });
        return;
      }
      resolve();
    });
  },

  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      'sessionFrom.rightsImageUrls': files,
    });
  },

  handleRemove(e) {
    const { index } = e.detail;
    const {
      sessionFrom: { rightsImageUrls },
    } = this.data;
    rightsImageUrls.splice(index, 1);
    this.setData({
      'sessionFrom.rightsImageUrls': rightsImageUrls,
    });
  },

  handleComplete() {
    this.setData({
      uploading: false,
    });
  },

  handleSelectChange() {
    this.setData({
      uploading: true,
    });
  },
});
