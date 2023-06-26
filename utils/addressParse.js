import { areaData } from '../config/index';

const addressParse = (provinceName, cityName, countryName) => {
  return new Promise((resolve, reject) => {
    try {
      const province = areaData.find((v) => v.label === provinceName);
      const { value } = province;
      const city = province.children.find((v) => v.label === cityName);
      const { value } = city;
      const country = city.children.find((v) => v.label === countryName);
      const { value } = country;
      resolve({
      });
    } catch (error) {
      reject('地址解析失败');
    }
  });
};

module.exports = {
  addressParse,
};
