const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * function 弹层
 * 参数: title 标题 / content 内容 
 **/
function showModal(title, content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      success(res) {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          reject(false);
        }
      }
    })
  });
}

/**
 * function 获取setting状态
 * 参数:
 **/

function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  })
}

/**
 * function 提示
 * 参数: title 标题 / status true/false/'loading' 状态
 **/
function showToast(title,status) {
  wx.showToast({
    title: title,
    icon: status !== 'loading' ? (status ? 'success' : 'none') : 'loading',
    duration: 1000
  });
}

/**
 * function 缓存
 * 参数: key 字段名 / value 值
 **/
function setStorage(key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
  return new Promise((resolve, reject) => {

  })
}

/**
 * function 获取
 * 参数: key 字段名
 **/
function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

/**
 * 订单状态
 * 交易状态： 0 等待卖家发货 、 1 付款确认中 、2 等待买家付款 、3 卖家已发货 、 4 交易成功 、5 交易关闭 、6 退款处理中 、 7 退款成功 、8 换货处理中 、9 换货成功
 */
function tradingStatus (status) {
  let tradingName = '';
  switch (status) {
    case 0: tradingName = '等待卖家发货';break;
    case 1: tradingName = '付款确认中'; break;
    case 2: tradingName = '等待买家付款'; break;
    case 3: tradingName = '卖家已发货'; break;
    case 4: tradingName = '交易成功'; break;
    case 5: tradingName = '交易关闭'; break;
    case 6: tradingName = '退款处理中'; break;
    case 7: tradingName = '退款成功'; break;
    case 8: tradingName = '换货处理中'; break;
    case 9: tradingName = '换货成功'; break;
    default: tradingName = '';break;
  }

  return tradingName;
}

/**
 * 退换 时间换算 是否超过退换货的时间
 * val 格式：yyyy-MM-dd hh:mm:ss
 * time 退换货的时间限制
 */
function limitedTime(val,time) {
  let isExceed = false;//是否超过退换货的时间
  if (!val) {
    return;
  }
  let date = new Date(val);
  let copyDate = new Date(val);
  copyDate.setDate(copyDate.getDate() + time);
  let millisecond = date.getTime();//订单时间毫秒数
  let lastDate = copyDate.getTime();//订单time天后的毫秒数
  let nowDate = new Date().getTime();//当前时间毫秒数

  let differenceDate = lastDate - nowDate;//time
  if (differenceDate < 0) {
    isExceed = true;
  }

  return isExceed;
}

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  showToast: showToast,
  setStorage: setStorage,
  getStorage: getStorage,
  getSetting: getSetting,
  wxPromisify: wxPromisify,
  tradingStatus: tradingStatus,
  limitedTime: limitedTime,
}
