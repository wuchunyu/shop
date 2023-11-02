import Toast from 'tdesign-miniprogram/toast/index';
import {
  request
} from '../../../../utils/util';

Page({
  options: {
    multipleSlots: true,
  },
  externalClasses: ['theme-wrapper-class'],
  data: {
    locationState: {
      addressId: '',
      cityName: '',
      detailAddress: '',
      districtName: '',
      isDefault: false,
      name: '',
      phone: '',
      provinceName: '',
      provinceCode: '',
    },
    areaData: '',
    areaPickerVisible: false,
  },
  onLoad(options) {
    const { id } = options;
    this.getareaData();
  },
  getareaData() {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/getAreaData', {}, 'GET', res.code).
            then((data) => {
              _this.setData({
                areaData: data.data
              })
            });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onInputValue(e) {
    const { item } = e.currentTarget.dataset;
    if (item === 'address') {
      const { selectedOptions = [] } = e.detail;
      this.setData(
        {
          'locationState.provinceName': selectedOptions[0].label,
          'locationState.provinceCode': selectedOptions[0].value,
          'locationState.cityName': selectedOptions[1].label,
          'locationState.cityCode': selectedOptions[1].value,
          'locationState.districtName': selectedOptions[2].label,
          'locationState.districtCode': selectedOptions[2].value,
          areaPickerVisible: false,
        },
        () => {
        },
      );
    } else {
      const { value = '' } = e.detail;
      this.setData(
        {
          [`locationState.${item}`]: value,
        },
        () => {
        },
      );
    }
  },
  onPickArea() {
    this.setData({ areaPickerVisible: true });
  },
  onCheckDefaultAddress({ detail }) {
    const { value } = detail;
    this.setData({
      'locationState.isDefault': value,
    });
  },

  async formSubmit() {
    const { locationState } = this.data;
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/addAddress', {
            addressId: locationState.addressId,
            phone: locationState.phone,
            name: locationState.name,
            provinceName: locationState.provinceName,
            provinceCode: locationState.provinceCode,
            cityName: locationState.cityName,
            cityCode: locationState.cityCode,
            districtName: locationState.districtName,
            districtCode: locationState.districtCode,
            detailAddress: locationState.detailAddress,
            isDefault: locationState.isDefault,
          }, 'POST', res.code).then(
            (res) => {
              if (res.ec !== 200) {
                console.log(res);
                wx.showToast({
                  title: res.em,
                  icon: 'error',
                  duration: 2000
                })

              } else {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateBack({ delta: 1 });
              }
            }
          );
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
});
