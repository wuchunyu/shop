import Toast from 'tdesign-miniprogram/toast/index';
import {
  getUrl,
  postUrl
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
    getUrl('/getAreaData').
      then((data) => {
        this.setData({
          areaData: data.data
        })
      });
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
    const result = await postUrl('/addAddress', {
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
    })
    console.log(result);
    if (result.ec !== 200) {
      Toast({
        context: this,
        selector: '#t-toast',
        message:
          result.em,
        duration: 2000,
        icon: 'close-circle',
      });
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存成功',
        icon: 'check-circle',
      });
      wx.navigateBack({ delta: 1 });
    }
  },
});
