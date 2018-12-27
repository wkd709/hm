//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slideList: [
      {img:'https://gw.alicdn.com/tfs/TB1AoIXeLDH8KJjy1XcXXcpdXXa-750-291.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/imgextra/i1/771510470/TB21SB0fIbI8KJjy1zdXXbe1VXa-771510470.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/imgextra/i2/745949152/TB2ATrSexPI8KJjSspfXXcCFXXa_!!745949152.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/tfs/TB1OYB8elfH8KJjy1XbXXbLdXXa-750-291.jpg_Q90.jpg'},
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    goodsSorts: [],//分类
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //分类
    wx.request({
        url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/index_goodsSort",
        success: (res) => {
            this.setData({
                goodsSorts: res.data.data.sorts
            })
        }
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
});
