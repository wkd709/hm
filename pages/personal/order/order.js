// pages/personal/order/order.js
const util = require('../../../utils/util.js');

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
    pageType: 5,
    dateList: [],
    isLoading: true,
    more: -1,//更多的显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type;

    this.getData("5");
  },
  /**
   * 获取数据
   */
  getData: function (type) {
    this.setData({'pageType': type});

    wx.showLoading({
      title: '加载中',
    });

    let postUrl = '/completed';
    switch (type*1) {
      case 1:
        postUrl = '/all'; break; //全部
      case 2:
        postUrl = '/Pending_payment'; break;//待付款
      case 3:
        postUrl = '/To_be_shipped'; break;//待发货
      case 4:
        postUrl = '/Goods_to_be_received'; break;//待收货
      case 5:
        postUrl = '/completed'; break;//已完成
      case 6:
        postUrl = '/Returns'; break;//退换货
    }
    wx.request({
      url: "https://www.easy-mock.com/mock/5c2485795e41f925428ab20a/hm/order" + postUrl,
      method: 'post',
      success: (res) => {
        wx.hideLoading();
        //处理后台数据
        let data = res.statusCode == 200 ? res.data.data.list : [];
        let getData = data;
        if (data&&data.length > 0) {
          let getData = data.map((item) => {
            item.orderStatusName = util.tradingStatus(item.tradingStatus);

            //退换 时间换算 是否超过退换货的期限
            item.isExceed = util.limitedTime(item.date);
            console.log(item);
          });
        }

        this.setData({
          "dateList": Object.assign(getData),
          "isLoading": false
        });
      },
      fail: (err) => {
        wx.hideLoading();
        this.setData({
          "dateList": [],
          "isLoading": false
        });
      }
    });
  },
  //点击页面
  tapFun: function (event) {
    let dataset =  event.target.dataset;
    //点击更多
    this.setData({ 'more': -1 });
    if (dataset.type&&dataset.type == 'more') this.setData({ 'more': dataset.index*1});

    //点击 顶部订单分类
    if (dataset.type && dataset.type == 'orderSort') this.getData(dataset.pagetype);
    //去首页
    if (dataset.type && dataset.type == 'home') wx.switchTab({ url: '/pages/index/index'});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const self = this;
    // this.setData({ 'pageType': self.options['type']});
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