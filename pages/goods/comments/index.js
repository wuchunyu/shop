import {
  request
} from '../../../utils/util';
import dayjs from 'dayjs';
const layoutMap = {
  0: 'vertical',
};
Page({
  data: {
    pageLoading: false,
    commentList: [],
    pageNum: 1,
    myPageNum: 1,
    pageSize: 10,
    total: 0,
    myTotal: 0,
    hasLoaded: false,
    layoutText: layoutMap[0],
    myLoadStatus: 0,
    spuId: '1060004',
    commentLevel: '',
    hasImage: '',
    commentType: '',
    totalCount: 0,
    countObj: {
      badCount: '0',
      commentCount: '0',
      goodCount: '0',
      middleCount: '0',
      hasImageCount: '0'
    },
  },
  onLoad(options) {
    this.getCount(options);
    this.getComments(options);
  },
  getCount(options) {
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchCommentsCount', {
            spuId: options.spuId,
          }, 'POST', res.code).
            then((result) => {
              this.setData({
                countObj: result.data,
              });
              const {
                data,
                code = ''
              } = result;
              wx.setNavigationBarTitle({
                title: `全部评价(${data.commentCount})`,
              });
              this.setData({
                countObj: data,
              });
            });
        }
      }
    })
  },
  generalQueryData(reset) {
    const {
      hasImage,
      pageNum,
      pageSize,
      spuId,
      commentLevel
    } = this.data;
    const params = {
      pageNum: 1,
      pageSize: 30,
      queryParameter: {
        spuId,
      },
    };
    if (
      Number(commentLevel) === 3 ||
      Number(commentLevel) === 2 ||
      Number(commentLevel) === 1
    ) {
      params.queryParameter.commentLevel = Number(commentLevel);
    }
    if (hasImage && hasImage === '1') {
      params.queryParameter.hasImage = true;
    } else {
      delete params.queryParameter.hasImage;
    }
    // 重置请求
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },
  init(reset = true) {
    const {
      commentList = []
    } = this.data;
    const params = this.generalQueryData(reset);

    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求 
          request('/fetchComments', params, 'POST', res.code).
            then((res) => {
              const {
                pageList,
                totalCount = 0
              } = res.data;
              pageList.forEach((item) => {
                // eslint-disable-next-line no-param-reassign
                item.commentTime = dayjs(Number(item.commentTime)).format(
                  'YYYY/MM/DD HH:mm',
                );
              });

              if (Number(totalCount) === 0 && reset) {
                _this.setData({
                  commentList: [],
                  hasLoaded: true,
                  total: totalCount,
                });
                return;
              }
              const _commentList = reset ? pageList : commentList.concat(pageList);
              _this.setData({
                commentList: _commentList,
                pageNum: params.pageNum || 1,
                totalCount: Number(totalCount),
              });
            });
        }
      }
    });
    this.setData({
      hasLoaded: true,
    });
  },
  getScoreArray(score) {
    var array = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        array.push(2);
      } else {
        array.push(0);
      }
    }
    return array;
  },
  getComments(options) {
    const {
      commentLevel = -1, spuId, hasImage = ''
    } = options;
    if (commentLevel !== -1) {
      this.setData({
        commentLevel: commentLevel,
      });
    }
    this.setData({
      hasImage: hasImage,
      commentType: hasImage ? '4' : '',
      spuId: spuId,
    });
    this.init(true);
  },
  changeTag(e) {
    var {
      commenttype
    } = e.currentTarget.dataset;
    var {
      commentType
    } = this.data;
    if (commentType === commenttype) return;
    this.setData({
      commentList: [],
      total: 0,
      myTotal: 0,
      myPageNum: 1,
      pageNum: 1,
    });
    if (commenttype === '' || commenttype === '5') {
      this.setData({
        hasImage: '',
        commentLevel: '',
      });
    } else if (commenttype === '4') {
      this.setData({
        hasImage: '1',
        commentLevel: '',
      });
    } else {
      this.setData({
        hasImage: '',
        commentLevel: commenttype,
      });
    }
    if (commenttype === '5') {
      this.setData({
        myLoadStatus: 1,
        commentType: commenttype,
      });
      this.getMyCommentsList();
    } else {
      this.setData({
        myLoadStatus: 0,
        commentType: commenttype,
      });
      this.init(true);
    }
  },
  onReachBottom() {
    const {
      total = 0, commentList
    } = this.data;
    if (commentList.length === total) {
      return;
    }

    this.init(false);
  },
});