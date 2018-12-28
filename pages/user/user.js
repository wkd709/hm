//获取应用实例
const app = getApp();

Page({
  data: {
  },
  onLoad: function() {
    
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
});