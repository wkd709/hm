// pages/personal/orderDetails/returnDetails/returnDetails.js

const util = require('../../../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataObj: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let loadData = options;
    if (loadData.orderNum) {
      this.getData(loadData.orderNum);
    }
  },
  //获取数据
  getData: function (orderNum) {
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: "https://www.easy-mock.com/mock/5c2485795e41f925428ab20a/tmXcx/order/ReturnsDetails",
      method: 'post',
      data: {
        "orderNum": orderNum
      },
      success: (res) => {
        wx.hideLoading();
        let data = res.data.data;
        if (res.statusCode == 200) {
          data.orderStatusName = util.tradingStatus(data.tradingStatus);
          data.completeDateFmt = util.getDate(data.negotiate.completeDate, 'yyyy年MM月dd日 hh:mm');
          this.setData({"dataObj": data});
        }
      },
      fail: (err) => {
        wx.hideLoading();
        this.setData({"dataObj": {}});
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