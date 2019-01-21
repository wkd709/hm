//获取应用实例
const app = getApp();

Page({
  data: {
    tabNav: [],//左边栏
    tabNavIndex: 0,
    tabMenu: new Array(16),//右边栏
    scrollTop: 0,
    isLoading: true,
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
          const index = obj&&obj.index ? obj.index : 0;
          var dataObj = {
            'tabMenu': self.data.tabMenu,
            tabNavIndex: index,
            scrollTop: 0
          }
          if (!obj) dataObj.tabNav = data.sideBlock; dataObj.tabMenu = self.data.tabMenu;
          if (!self.data.tabMenu[index]) dataObj.isLoading = false; dataObj.tabMenu[index] = data.mainBlock.models; 
          self.setData(dataObj);
        }
      }
    });
    
  },
  changeNav(event) {//选择分类
    const data = event.currentTarget.dataset;
    !this.data.tabMenu[data.index] ? this.setData({isLoading: true}) : '';
    this.getData(data);
  },
});