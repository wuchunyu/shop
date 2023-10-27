import {
  request,
} from '../../../utils/util';
Page({
  data: {
    invoice: {},
  },
  onLoad({ orderNo }) {
    this.orderNo = orderNo;
    this.init();
  },
  init() {
    this.getDetail();
  },
  getDetail() {
    const params = {
      parameter: this.orderNo,
    };
    wx.login({
      success(res) {

        if (res.code) {
          //发起网络请求
          request('/invoiceDetails', {}, 'GET', res.code).then(res => {
            const order = res.data;
            const invoice = {
              buyerName: order?.buyerName, //个人或公司名称
              buyerTaxNo: order?.buyerTaxNo, //税号
              buyerPhone: order?.buyerPhone, //手机
              email: order?.email, //邮箱
              titleType: order?.titleType === 1 ? '个人' : '公司', //发票抬头 1-个人 2-公司
              ontentType: order?.ontentType === 1 ? '商品明细' : '2类别', //发票内容 1-明细 2类别
              invoiceType:
                order?.invoiceType === 5 ? '电子普通发票' : '不开发票', //是否开票 0-不开 5-电子发票
              isInvoice: order?.buyerName ? '已开票' : '未开票',
              money: order?.money,
            };
            this.setData({
              invoice,
            });
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
});
