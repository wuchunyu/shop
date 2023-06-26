/* eslint-disable */
import { mockIp, mockReqId } from '../../../utils/mock';

export const resp = {
  data: {
    pageNum: 1,
    pageSize: 10,
    totalCount: 51,
    states: {
      audit: 1,
      approved: 6,
      complete: 2,
      closed: 1,
    },
    dataList: [
      {
        buttonVOs: [
          {
            name: '修改运单号',
            primary: false,
            type: 4,
          },
          {
            name: '查看物流',
            primary: false,
            type: 5,
          },
        ],

        storeId: '2591',
        refundMethodList: [
          {
            refundMethodAmount: 99999,
            refundMethodName: '微信支付',
          },
          {
            refundMethodAmount: 100000,
            refundMethodName: '银行卡支付',
          },
        ],
        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '123123423',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 50,
          rightsStatusName: '已完成',
          rightsType: 20,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',
          updateTime: '1596524705613',
          userRightsStatus: 120,
          userRightsStatusDesc:
            '商家已退款，退回资金将原路三个工作日返回您的账户',
          userRightsStatusName: '已退款',
          afterSaleRequireType: 'REFUND_MONEY',
          rightsImageUrls: [
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
          ],
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
          {
            actualPrice: 9999,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '华为手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 9999,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 8123129,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          refundDesc: '由于您信誉良好，商家同意退款',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: 'SF2380380982034',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '顺丰',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
          nodes: [
            {
              title: '已签收',
              icon: 'https://cdn-we-retail.ym.tencent.com/tsr/icon/order.png',
              code: '200003',
              desc: '商家已签收，感谢使用顺丰，期待再次为您服务',
              date: '2020-09-11 11:34:53',
            },
            {
              title: '运输中',
              icon: 'https://cdn-we-retail.ym.tencent.com/tsr/icon/deliver.png',
              desc: '快件已到达成都中转站',
              code: '200002',
              date: '2020-07-16 11:16:31',
            },
            {
              title: '已寄出',
              icon: 'https://cdn-we-retail.ym.tencent.com/tsr/icon/deliver.png',
              desc: '买家已寄出，物流承运商：顺丰速运',
              date: '2020-07-16 11:16:21',
            },
          ],
        },
      },
      {
        buttonVOs: [
          {
            name: '填写运单号',
            primary: false,
            type: 3,
          },
        ],

        storeId: '2591',
        createTime: '1596524705613',
        rights: {
          rightsImageUrls: [
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
          ],
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234231',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',
          updateTime: '1596524705613',
          userRightsStatus: 100,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          refundDesc: '由于您信誉良好，商家同意退款',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: 'SA9208097023203',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '申通快递',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '撤销申请',
            primary: false,
            type: 2,
          },
        ],

        storeId: '2591',
        createTime: '1596524705613',
        rights: {
          rightsImageUrls: [
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
          ],
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234232',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 60,
          rightsStatusName: '已关闭',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',
          updateTime: '1596524705613',
          userRightsStatus: 100,
          userRightsStatusDesc: '商家将尽快确认您的退款申请',
          userRightsStatusName: '等待商家审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
          refundDesc: '实际商品与描述不符',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: 'SF9343043084',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '顺丰',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [],

        storeId: '2591',
        createTime: '1596524705613',
        refundMethodList: [
          {
            refundMethodAmount: 99999,
            refundMethodName: '微信支付',
          },
          {
            refundMethodAmount: 100000,
            refundMethodName: '银行卡支付',
          },
        ],
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234233',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 50,
          rightsStatusName: '已完成',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName:
            '大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 160,
          userRightsStatusDesc: '退款/售后已完成',
          userRightsStatusName: '已完成',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '修改运单号',
            primary: false,
            type: 4,
          },
        ],

        storeId: '2591',
        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234234',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '80900909',
          logisticsStatus: null,
          logisticsCompanyCode: '0004',
          logisticsCompanyName: '顺丰快递',
          remark: '质量问题，申请退货退款',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '撤销申请',
            primary: false,
            type: 2,
          },
        ],

        storeId: '2591',
        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234235',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 10,
          rightsStatusName: '待审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName:
            '大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店-大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc:
            '商家将在24小时内审核，如24小时后商家仍未审核，系统将自动审核通过',
          userRightsStatusName: '待商家审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName:
              '小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '修改运单号',
            primary: false,
            type: 4,
          },
        ],

        storeId: '2591',

        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234236',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '90900808',
          logisticsStatus: null,
          logisticsCompanyCode: '0002',
          logisticsCompanyName: '申通快递',
          remark: '质量问题，申请退货退款',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '填写运单号',
            primary: false,
            type: 3,
          },
        ],

        storeId: '2591',

        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234237',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '撤销申请',
            primary: false,
            type: 2,
          },
        ],

        storeId: '2591',

        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '123131231238',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234238',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName: '小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
      {
        buttonVOs: [
          {
            name: '填写运单号',
            primary: false,
            type: 3,
          },
        ],

        storeId: '2591',

        createTime: '1596524705613',
        rights: {
          bizRightsStatus: 1,
          bizRightsStatusName: '退款退货',
          createTime: '1596524705613',
          orderNo: '12313123123',
          refundAmount: 99999,
          refundRequestAmount: 999999,
          rightsMethod: 1,
          rightsNo: '1231234239',
          rightsParentNo: '78970',
          rightsReasonDesc: '太贵了，不想要了',
          rightsReasonType: 10,
          rightsStatus: 20,
          rightsStatusName: '已审核',
          rightsType: 10,

          shippingFee: 99,
          shippingFeeBear: 1,
          storeId: 123,
          storeName: '大猫集团旗舰店',

          updateTime: '1596524705613',
          userRightsStatus: 1,
          userRightsStatusDesc: '商家已审核确认，预计1小时内发起退款',
          userRightsStatusName: '商家已审核',
        },
        rightsItem: [
          {
            actualPrice: 888,
            createTime: '1596524705613',
            disconutInfo: '现在下单，立刻优惠100元',
            goodsName:
              '小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机-小米手机',
            goodsPictureUrl:
              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
            goodsViceType: 1,
            itemDiscountAmount: 123123,
            itemRefundAmount: 888,
            itemStatus: 2,
            itemTotalAmount: 9913,
            orderNo: '12312333',
            parentOrderNo: '1231234',
            rightsId: 423423,
            rightsNo: '112333',
            rightsParentNo: '345345',
            rightsQuantity: 12,

            skuId: 812312,
            specInfo: [
              {

                specValues: '超长测试超长测试1',
              },
              {

                specValues: 'eee',
              },
            ],
            updateTime: '1596524705613',
          },
        ],
        rightsRefund: {
          callbackTime: '1596524705613',
          channel: '微信支付',
          channelTrxNo: '123123',
          createTime: '1596524705613',
          memo: '无摘要',
          refundAmount: 9999,
          refundStatus: 1,
          requestTime: '1596524705613',
          successTime: '1596524705613',
          traceNo: '123123',
          updateTime: '1596524705613',
        },
        logisticsVO: {
          logisticsType: 1,
          logisticsNo: '',
          logisticsStatus: null,
          logisticsCompanyCode: '',
          logisticsCompanyName: '',
          receiverAddressId: '20',



          receiverProvince: '广东省',
          receiverCity: '深圳市',
          receiverCountry: '南山区',
          receiverArea: '',
          receiverAddress: '清风路御龙湾',
          receiverPostCode: '',
          receiverLongitude: '113.880562',
          receiverLatitude: '22.56271',
          receiverIdentity: '88881046205',
          receiverPhone: '18371736717',
          receiverName: '周杰伦',
          expectArrivalTime: null,
          senderName: '刘德华',
          senderPhone: '1273109238123',
          senderAddress: '北京市昌平区大丰家园三号楼四单元108号',
          sendTime: null,
          arrivalTime: null,
        },
      },
    ],
  },
  code: 'Success',
  msg: null,
  requestId: mockReqId(),
  clientIp: mockIp(),
  rt: 79,
  success: true,
};

export function getRightsList({ parameter: { afterServiceStatus, pageNum } }) {
  const _resq = JSON.parse(JSON.stringify(resp));
  if (pageNum > 3) _resq.data.dataList = [];
  if (afterServiceStatus > -1) {
    _resq.data.dataList = _resq.data.dataList.filter(
      (item) => item.rights.rightsStatus === afterServiceStatus,
    );
  }
  return Promise.resolve(_resq);
}
