// pages/personal/orderDetails/orderDetails/orderDetails.js
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsObj: '',
    more: false,
    isDelChange: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.orderNum);
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
  // 事件
  clickTap: function (event) {
    let dataset = event.target.dataset;
    console.log(dataset);

    //更多
    if (dataset.type == 'more') {
      this.setData({ "more": !this.data.more});
    }

    //删除订单
    if (dataset.type == 'del') {
      //待付款
      if (dataset.tradingstatus == 2) {
        this.setData({ "isDelChange": true });
      }

      //成功的订单
      if (dataset.tradingstatus == 4 || dataset.tradingstatus == 5
        || dataset.tradingstatus == 7 || dataset.tradingstatus == 9) {
        util
          .showModal('确认删除订单？', '删除之后可以从电脑端的回收站恢复')
          .then(res => {
            // 调接口删除订单
            util.showToast('删除成功', true);
          })
          .catch((err) => {
            util.showToast('删除失败', false);
          });
      }
    }

    //付款
    if (dataset.type == 'payment') {
      util.showToast('付款成功', true);
    }
  },
  /**
   * 子组件取消订单
   */
  onDelOrder: function (val) {
    console.log(val);
    //下一步调接口取消订单
    util.showToast('取消成功', true);
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