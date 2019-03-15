// pages/productDetails/productdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    loading: true,
    indicatorDots: false,
    autoplay: false,
    interval: 1000,
    duration: 500,
    slideIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getData() {//获取页面数据
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'post',
      url: "https://www.easy-mock.com/mock/5c2485795e41f925428ab20a/tmXcx/productdetails/520386884400",
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          let data = res.data.data;
          console.log(data);
          this.setData({ 'obj': data,"loading": false});
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    });
  },
  scroll(event) {//滚动事件
    console.log(event);
  },
  bindchange(event) {
    console.log(event);
    let current = event.detail;
    this.setData({ 'slideIndex': current.current*1+1 });
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