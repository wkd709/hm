const util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    isUserInfo: false,
    userInfo: {},
  },
  onLoad: function() {
    var self = this;
    util.getStorage('userInfo')
      .then(res => {
        self.setData({ 'isUserInfo': true, 'userInfo': res });
      })
      .catch((err) => {
        self.setData({ 'isUserInfo': false });
      });;
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