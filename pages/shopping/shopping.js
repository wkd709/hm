//获取应用实例
const app = getApp();

Page({
  data: {
    shopping:'1',
    isEdit: false,
  },
  isEditTap(event) {
    this.setData({"isEdit": !this.data.isEdit});
  },
  changeAll() {//全选
    
  },
});