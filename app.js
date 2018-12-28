//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    var self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 查看 用户信息 是否授权 
    // wx.getSetting({
    //   success: function (res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
  }
})