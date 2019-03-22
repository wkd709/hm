//index.js

const util = require('../../utils/util.js');
import { wxRequest } from '../../utils/http.js';
const config = require('../../utils/config.js');
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js'); //地图
const { regeneratorRuntime } = global;

//获取应用实例
const app = getApp();
Page({
  data: {
    loading: false,
    slideList: [
      {img:'https://gw.alicdn.com/tfs/TB1AoIXeLDH8KJjy1XcXXcpdXXa-750-291.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/imgextra/i1/771510470/TB21SB0fIbI8KJjy1zdXXbe1VXa-771510470.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/imgextra/i2/745949152/TB2ATrSexPI8KJjSspfXXcCFXXa_!!745949152.jpg_Q90.jpg'},
      {img:'https://img.alicdn.com/tfs/TB1OYB8elfH8KJjy1XbXXbLdXXa-750-291.jpg_Q90.jpg'},
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    goodsSorts: [],//分类
    recommendLikes:[],//猜你喜欢
    current: 0,//分类Index
    qqmapsdk: '',//地图
    mapInfo: {},//地理位置

    // layer组件
    // layerObj: {},
    // isLayer: false,
  },
  onPullDownRefresh:function() {//监听下拉事件
    // wx.stopPullDownRefresh();//停止当前页面下拉刷新
  },
  onLoad: function () {
    var self = this;
    // 获取用户设置 第一次进入时 res.authSetting={} 
    wx.getSetting({
      success(res) {
        console.log(res);
        var data = JSON.stringify(res.authSetting);
        if (data != '{}') {// !== "{}" 代表不是第一次进入
          if (!res.authSetting['scope.userLocation']) {//未授权获取地址
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success(res) {
                if (res.confirm) {
                  self.setting();
                } else if (res.cancel) {
                  util.showToast('授权失败', false);
                }
              }
            })
          } else {
            self.getArea();
          }
        } else {//第一次进入
          self.getArea();
        }
      }
    })

    //初始化地图
    let qqmapsdk = new QQMapWX({
      key: config.txMapKey
    });
    this.setData({qqmapsdk: qqmapsdk});
   
    this.getData();
  },
  //组件事件 
  onEvent: function (e) {
    console.log(e.detail);
    if (e.detail.btnType) {//确定
      // 设置权限
      this.setting();
    } else {//取消
      this.setData({ isLayer: false });
    }
  },
  map(latitude, longitude) {
    var self = this;
    this.data.qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res){
        if (res.status == 0) {
          var data = res.result.ad_info;
          self.setData({ mapInfo: data });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  getData: async function () {//获取接口数据
    //分类
    wxRequest('/all_sort', 'get', {
      hideLoading: false,
      data: {},
    }).then((res) => {
      this.data.goodsSorts[0] = res.data.splice(0, 10);
      this.data.goodsSorts[1] = res.data;
      this.setData({
        goodsSorts: this.data.goodsSorts
      })
    });

    //猜你喜欢
    await wxRequest('/recommend_like', 'post', {
      hideLoading: false,
      data: {},
    }).then((res) => {
      let data = res.data;
      this.setData({ "recommendLikes": data });
    }).catch((err)=> {
      console.log(err);
    });
    this.setData({'loading':true});
  },
  tapDetails(e) {//点击进入详情页
    let id = e.target.dataset.id || e.currentTarget.dataset.id;
    if (!id) return false;
    wx.navigateTo({url: '/pages/productDetails/productdetails?id='+id});
  },
  getArea() {//获取当前位置
    var self = this;
    //获取地址
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success(res) {
        console.log(res, 2);
        const latitude = res.latitude;
        const longitude = res.longitude;
        const speed = res.speed;
        const accuracy = res.accuracy;
        self.map(latitude, longitude);
      },
      fail(err) {
        console.log(err, 3);
      }
    })
  },
  setting() {//设置授权
    var self = this;
    this.setData({ isLayer: false });
    wx.openSetting({
      success(res) {
        console.log(res,1);
        if (res.authSetting['scope.userLocation']) {//授权获取地址成功
          wx.getSetting({
            success(res) {
              console.log(res,33);
              if (res.authSetting['scope.userLocation']) {//授权获取地址成功
                self.getArea();
              } else {
                util.showToast('授权失败', false);
              }
            },
            fail(err) {
              console.log(err);
              util.showToast('授权失败', false);
            }
          });
        } else {
          util.showToast('授权失败', false);
        }
      },
      fail(err) {
        util.showToast('授权失败', false);
      }
    })
  },
  intervalChange(e) {//滑动分类
    this.setData({ current: e.detail.current })
  },
});