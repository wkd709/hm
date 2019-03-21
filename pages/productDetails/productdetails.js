// pages/productDetails/productdetails.js
const { regeneratorRuntime } = global;
import { wxRequest } from '../../utils/http.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    loading: false,
    indicatorDots: false,
    autoplay: false,
    interval: 1000,
    duration: 500,
    slideIndex: 1,
    //滚动
    screenHeight: 600,
    toView: 'img',
    navActive: 'img',
    isFixed: false,
    //isShow
    isShow: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  scroll: function (ev) {//滚动
    let event = ev.detail;
    let actView = 'img';
    let isFixed = false;
    if (event.scrollTop > 10 ) {
      isFixed = true;
    }
    if (600 > event.scrollTop) {
      actView = 'img';
    } else if (600 <= event.scrollTop && event.scrollTop < 900) {
      actView = 'evaluation';
    } else if (event.scrollTop >= 900) {
      actView = 'details';
    }

    this.setData({ 'isFixed': isFixed, 'navActive': actView});
  },
  upper() {//滚动到顶部
    this.setData({ 'isFixed': false });
  },
  switchTab(e) {//跳转
    let event = e.target.dataset || e.currentTarget.dataset;
    //跳转首页
    if (event.type=='home') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }

    //跳转购物车
    if (event.type == 'shopping') {
      wx.switchTab({
        url: '/pages/shopping/shopping'
      })
    }

    //跳转分类
    if (event.type == 'sort') {
      wx.switchTab({
        url: '/pages/sort/sort'
      })
    }

    //跳转搜索页
    if (event.type == 'search') {
      
    }

    console.log(event);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this;
    wx.getSystemInfo({
      success(res) {
        self.setData({ 'screenHeight': res.screenHeight});
      }
    })
  },
  getData() {//获取页面数据
    wxRequest('/productdetails/520386884400', 'post', {
      hideLoading: false,
      data: {},
    }).then((res) => {
      let data = res.data;
      this.setData({ 'obj': data, "loading": true });
    });
  },
  showMore(e) {//显示更多
    let event = JSON.stringify(e.target.dataset) !== "{}" ? e.target.dataset : e.currentTarget.dataset;
    
    //参数
    if (event.type == 'evaluation') {
      this.setData({'isShow':'evaluation'});
    }

    //参数 点击隐藏
    if (e.target.dataset.type) {
      this.setData({ 'isShow': '' });
    }
  },
  moveTap(e) {
    let event = JSON.stringify(e.target.dataset) !== "{}" ? e.target.dataset : e.currentTarget.dataset;
    if (!event.type || event.type == this.data.toView) {
      return false;
    }
    this.setData({ 'toView': event.type, 'navActive': event.type});
  },
  bindchange(event) {
    let current = event.detail;
    this.setData({ 'slideIndex': current.current*1+1 });
  },
  addCart() {//加入购物车
    console.log('加入购物车');
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