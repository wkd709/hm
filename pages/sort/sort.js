//获取应用实例
const app = getApp();

Page({
  data: {
    tabNav: [],//左边栏
    tabNavIndex: 0,
    tabMenu: [],//右边栏
    scrollTop: 0,
  },
  onLoad: function () {
    this.getData();
  },
  getData(obj) {//获取接口数据
    const self =  this;
    //分类
    const getUrl = 'https://www.easy-mock.com/mock/5c2485795e41f925428ab20a/hm/mallnav' + (obj ? "/" + obj.id : '');
    wx.request({
      url: getUrl,
      method: 'post',
      success: (res) => {
        
        const data = res.data.data;
        if (data) {
          if (obj) {
            self.setData({
              'tabMenu': data.mainBlock.models,
              tabNavIndex: obj.index,
              scrollTop: 0
            });
          } else {
            self.setData({ 
              'tabNav': data.sideBlock,
              'tabMenu': data.mainBlock.models,
              tabNavIndex: 0,
              scrollTop: 0
            });
          }
        }
      }
    });
  },
  changeNav(event) {//选择分类
    const data = event.currentTarget.dataset;
    this.getData(data);
  },
});