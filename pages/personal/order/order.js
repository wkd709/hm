// pages/personal/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderSort: [
      { name: '全部', type: 1 },
      { name: '待付款', type: 2 },
      { name: '待发货', type: 3 },
      { name: '待收货', type: 4 },
      { name: '已完成', type: 5 },
      { name: '退换货', type: 6 },
    ],
    pageType: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const self = this;
    this.setData({ 'pageType': self.options['type']});
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