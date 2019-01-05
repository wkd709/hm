const util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    isLoading: true,//是否加载中
    userInfo: '',
  },
  onLoad: function() {
    var self = this;
    if (this.data.isLoading) {
      wx.showLoading({
        title: '加载中',
      });
      // 获取是否已登录过
      util.getStorage('userInfo')
        .then(res => {
          setTimeout(()=>{
            wx.hideLoading();
            console.log(res);
            self.setData({
              'isLoading': false,
              'userInfo': res
            });
          },1000)
        })
        .catch((err) => {
          setTimeout(() => {
            wx.hideLoading();
            self.setData({
              'isLoading': false,
              'userInfo': ''
            });
          }, 1000)
        });
    } else {
      wx.hideLoading();
    }
  },
  getUserInfo() {
    var self = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo);
        self.setData({ 'isUserInfo': true, 'userInfo': res});
      }
    })
  },
  setStorage(key,val) {//缓存
    wx.setStorage({
      key: key,
      data: val
    })
  },
  onGotUserInfo: function (e) {
    if (e.detail.errMsg.indexOf('ok') !== -1) {

      this.setStorage('userInfo', e.detail.userInfo);
      this.setData({ 'isUserInfo': true, 'userInfo': e.detail.userInfo});
    }
  },
});