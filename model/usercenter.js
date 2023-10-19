const userInfo = {
  avatarUrl:
    'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
  nickName: 'TDesign 🌟',
  phone: '13438358888',
  gender: 2,
};

const orderTagInfos = [
  {
    orderNum: 1,
    tabType: 5,
  },
  {
    orderNum: 1,
    tabType: 10,
  },
  {
    orderNum: 1,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  orderTagInfos,
});
