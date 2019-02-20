// pages/personal/orderDetails/orderDetails/orderDetails.js
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsObj: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData('265029317759605196');
  },
  getData: function (orderNum) {
    wx.showLoading({
      title: '加载中',
    });
    
    wx.request({
      url: "https://www.easy-mock.com/mock/5c2485795e41f925428ab20a/tmXcx/order/orderDtails/"+orderNum,
      method: 'post',
      data: {
        "orderNum": orderNum
      },
      success: (res) => {
        wx.hideLoading();
        let data = res.data.data;
        data.orderStatusName = util.tradingStatus(data.tradingStatus);
        if (data.tradingStatus == 2) {//待付款状态时 一天后自动关闭
          
          let tDate = new Date(data.date);
          tDate.setDate(tDate.getDate() + 1);
          data.countdown =  util.getCountdown(tDate);
        }
        
        if (res.statusCode == 200) {
          this.setData({'detailsObj':data});
        }
      },
      fail: (err) => {
        wx.hideLoading();
        this.setData({ 'detailsObj': '' });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})