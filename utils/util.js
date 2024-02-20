let systemWidth = 0;
/** 获取系统宽度，为了减少启动消耗所以在函数里边做初始化 */
export const loadSystemWidth = () => {
  if (systemWidth) {
    return systemWidth;
  }

  try {
    ({
      screenWidth: systemWidth,
      pixelRatio
    } = wx.getSystemInfoSync());
  } catch (e) {
    systemWidth = 0;
  }
  return systemWidth;
};

/**
 * 转换rpx为px
 *
 * @description
 * 什么时候用？
 * - 布局(width: 172rpx)已经写好, 某些组件只接受px作为style或者prop指定
 *
 */
const rpx2px = (rpx, round = false) => {
  loadSystemWidth();

  // px / systemWidth = rpx / 750
  const result = (rpx * systemWidth) / 750;

  if (round) {
    return Math.floor(result);
  }

  return result;
};

// 内置手机号正则字符串
const innerPhoneReg =
  '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$';

/**
 * 手机号正则校验
 * @param phone 手机号
 * @param phoneReg 正则字符串
 * @returns true - 校验通过 false - 校验失败
 */
const phoneRegCheck = (phone) => {
  const phoneRegExp = new RegExp(innerPhoneReg);
  return phoneRegExp.test(phone);
};

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET", code) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://www.changdaoke.com' + url,
      // url: 'https://g.recallg.com' + url,
      // url: 'https://www.fastmock.site/mock/8ccc2ad21c37149c6f6b9d3aac2b06f2/api' + url,
      data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token'),
        'code': code
      },
      success: function (res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作

            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              request(api.AuthLoginByWeixin, {
                code: code,
                userInfo: userInfo
              }, 'POST').then(res => {
                if (res.errno === 0) {
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        console.log('--err--', err);
        reject(err)
      }
    })
  });
}

module.exports = {
  rpx2px,
  phoneRegCheck,
  request,
};