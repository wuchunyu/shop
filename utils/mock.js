/**
 * 生成随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns
 */
function getRandomNum(min, max) {
  var range = max - min;
  var rand = Math.random();
  return min + Math.round(rand * range);
}

module.exports = {
  getRandomNum,
};
