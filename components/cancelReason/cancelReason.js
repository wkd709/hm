// components/cancelReason/cancelReason.js
const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isDialog: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      { name:"我不想买了", type: 1 },
      { name: "信息填写错误，重新拍", type: 2 },
      { name: "卖家缺货", type: 3 },
      { name: "同城见面交易", type: 4 },
      { name: "其它原因", type: 5 },
    ],
    activeType: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnChange: function (event) {
      let dataset = event.target.dataset;
      //选择某一项
      if (dataset.type == 'item') {
        this.setData({ 'activeType': dataset.id});
      }

      //取消按钮
      if (dataset.type == 'cancel') {
        this.setData({ 'activeType': 0,"isDialog": false });
      }

      //确定按钮
      if (dataset.type == 'yes') {
        if (this.data.activeType <= 0) {
          util.showToast('请选择一项原因', false);
          return false;
        }
        this.setData({ "isDialog": false  });
        this.triggerEvent("del", { "activeType": this.data.activeType });
      }
    }
  }
})