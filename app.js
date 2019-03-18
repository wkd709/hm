//app.js
const util = require('./utils/util.js')
global.regeneratorRuntime = require('./libs/regenerator/runtime-module');
App({
  onLaunch: function () {
    var self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
  },
  onShow: function () {
    var self = this;

  },
  globalData: {
  }
})