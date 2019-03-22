//获取应用实例
const { regeneratorRuntime } = global;
import { wxRequest } from '../../utils/http.js';
import { toDecimal2, showToast, showModal, setStorage } from '../../utils/util.js';
const app = getApp();

Page({
  data: {
    loading: false,
    isEdit: false,
    editName: '管理',
    obj: {},
    checkNumber: 0,
    orderObj:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData() {
    wxRequest('/shoppingCart', 'post', {
      hideLoading: false,
      data: {},
    }).then((res) => {
      let data = res.data;
      this.setData({ 'obj': data, "loading": true });
      console.log(res.data);
    }).catch(err => {
      showToast(err);
    });;
  },
  isEditTap(event) {//点击管理/完成
    this.setData({ 
      "isEdit": !this.data.isEdit,
      "editName": this.data.editName == '完成' ? '管理' : '完成'
    });
  },
  checkAndInput(e) {//全选
    let dataset = '';
    let dataVal = this.data.obj;
    if (JSON.stringify(e.target.dataset) !== "{}") {
      dataset = JSON.stringify(e.currentTarget.dataset) !== "{}" ? 
        Object.assign(e.target.dataset, e.currentTarget.dataset) : e.currentTarget.dataset;
    } else {
      dataset = e.currentTarget.dataset;
    }

    let prams = {
      checkAll: false,
      type: dataset.type,
    };
    // 全选
    if (dataset.type == "checkAll") {
      prams.checkAll = dataVal.footer.checkAll.checked ? false : true;
    }

    if (dataset.type == "checkItem") {
      prams.item = {
        id: dataset.itemid ? dataset.itemid : '',
        check: dataset.itemstauts ? dataset.itemstauts : false,
      }
    }

    //某一项加减数量
    if (dataset.type == "input") {
      prams.item = {
        id: dataset.itemid ? dataset.itemid : '',
        inputstatus : dataset.status
      }
    }
    
    this.dataCount(prams);
  },
  dataCount(pramsObj) {//勾选 并且计算
    let data = this.data.obj;
    data.footer.price = 0.00;
    data.footer.submit.value = 0.00;
    let checkNum = 0;//总共勾选个数
    let orderNum = 0;//订单个数

    data.list.forEach((key,index)=>{
      key.order.forEach((ele, ind) => {
        orderNum = orderNum+1;

        // 全选时
        if (pramsObj.type == 'checkAll') {
          ele.checked = pramsObj.checkAll;
        }

        //勾选某一项时
        if (pramsObj.type == "checkItem" && ele.sellerId == pramsObj.item.id) {
          ele.checked = pramsObj.item.check;
        }

        //某一项加减数量
        if (pramsObj.type == "input" && ele.sellerId == pramsObj.item.id) {
          // 加
          if (pramsObj.item.inputstatus == "add") {
            if (ele.amount.now < ele.amount.max) ele.amount.now = ele.amount.now * 1 + 1;
          } else {//减
            if (ele.amount.now > 1) ele.amount.now = ele.amount.now * 1 - 1;
          }
        }
        
        if (ele.checked) {
          checkNum = checkNum+1;
          ele.price.sum = ele.amount.now * ele.price.now;//某个商品的总价格
          data.footer.price = toDecimal2(data.footer.price * 1 + ele.price.sum);//所有商品的总价
          data.footer.submit.value = data.footer.submit.value*1 + ele.amount.now;//总个数
        }
        
        data.footer.checkAll.checked = orderNum == checkNum ? true : false;
      });
    });

    this.setData({ "obj": data, 'checkNumber': checkNum});
  },
  submitFun() {
    if (this.data.checkNumber<=0) {
      showToast('您还没有选择宝贝哦!', false);
      return false;
    }
    let data = this.data.obj;
    let order = {
      totalPrice: data.footer.price,
      totalNum: 0,
      list: [],
      address: {},
    };

    data.list.forEach((key, index) => {
      key.totalPrice = 0;
      key.orderNum = 0;
      let item = {
        order: [],
        seller: key.seller,
        shopId: key.shopId,
        title: key.title,
        totalPrice: 0,
        orderNum: 0,
      };
      key.order.forEach((ele, ind) => {
        if (ele.checked) {
          item.totalPrice = toDecimal2(item.totalPrice * 1 + ele.price.now * ele.amount.now);
          item.orderNum = item.orderNum * 1 + ele.amount.now;
          order.totalNum = order.totalNum*1 + ele.amount.now;
          item.order.push(ele);
        }
      })
      if (item.order && item.order.length>0) {
        order.list.push(item);
      }
    })
    setStorage('order', order,10000);
    wx.navigateTo({ url: '/pages/confirmOrder/confirmOrder'});
  },
  tapBtn(e) {
    let dataset = JSON.stringify(e.target.dataset) !== "{}" ? e.target.dataset : e.currentTarget.dataset;
    console.log(dataset);
    if (this.data.checkNumber <= 0) {
      showToast('您还没有选择宝贝哦!', false);
      return false;
    }
    // 删除
    if (dataset.type == 'del') {
      showModal('删除','确定要删除吗?')
      .then(res=>{
        showToast('删除成功','success');
      })
      .catch(err=>{});
    }

    // 移入收藏夹
    if (dataset.type == 'collection') {
      showToast('收藏成功', 'success');
    }
  },
});