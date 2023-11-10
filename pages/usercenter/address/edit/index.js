import {
  request, phoneRegCheck
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
      cityCode: '',
      detailAddress: '',
      districtName: '',
      districtCode: '',
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
    if (Object.keys(options).length !== 0) {
      const detail = JSON.parse(options.detail);
      this.setData({
        locationState: {
          ...detail,
          isDefault: detail.isDefault === 1 ? true : false,
        }
      })
    }
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
    if (locationState.name === '' || locationState.provinceName === '' || locationState.provinceCode === '' || locationState.cityName === '' || locationState.cityCode === '' || locationState.districtName === '' || locationState.districtCode === '' || locationState.detailAddress === '') {
      wx.showToast({
        title: '不得为空',
        icon: 'error',
        duration: 2000
      })

      return;
    }
    if (!phoneRegCheck(locationState.phone)) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'error',
        duration: 2000
      })
      return;
    }
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/editAddress', {
            ...locationState,
            isDefault: locationState.isDefault ? 1 : 0,
          }, 'POST', res.code).then(
            (res) => {
              if (res.ec == 200) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateBack({ delta: 1 });
              }
            }
          );
        }
      }
    })
  },
});
