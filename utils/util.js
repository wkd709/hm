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

/**
 * 时间转换
 * fmt  例如：yyyy-MM-dd hh:mm:ss
 **/
function getDate (val, fmt) {
  var date = '';
  if (!val) {
    date = new Date();
  } else if (val) {
    date = new Date(val);
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),//季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/**
 * 24小时倒计时 
 * 时 分 例如：hh小时mm分钟
 **/
function getCountdown(val) {
  let yDate = new Date(val);
  let nowDate = new Date();
  let cDate = yDate.getTime() - nowDate.getTime();
  
  if (cDate <= 0) {
    return ;
  }
 
  let hour = Math.floor(cDate / (60 * 60 * 1000));
  let minute = Math.round(cDate / (60 * 1000) - 60 * hour);
  
  return hour + "小时" + minute + "分钟";
}

/**
 * 保留两位小数的方法
 * @param {*} num 传入的数字
 **/
function toDecimal2 (num) {
  var f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  var f = (Math.round(num * 100) / 100).toFixed(2);
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

var redis = "redis";

/**
 * 设置
 * k 键key
 * v 值value
 * t 秒
 */
function setStorage(k, v, t) {
  wx.setStorageSync(k, v);
  var seconds = parseInt(t);
  if (seconds > 0) {
    var newtime = Date.parse(new Date())
    newtime = newtime / 1000 + seconds;
    wx.setStorageSync(k + redis, newtime + "");
  } else {
    wx.removeStorageSync(k + redis);
  }
}
/**
 * 获取
 * k 键key
 */
function getStorage(k) {
  var deadtime = parseInt(wx.getStorageSync(k + redis));
  var res = wx.getStorageSync(k);
  return new Promise((resolve, reject) => {
    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
        wx.removeStorageSync(k);
        console.log("过期了");
        reject(null);
      }
    }
    if (res) {
      resolve(res);
    } else {
      reject(null);
    }
  });
}

/**
 * 删除
 */
function removeStorage(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + redis);
}

/**
 * 清除所有key
 */
function clearStorage() {
  wx.clearStorageSync();
}

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  showToast: showToast,
  setStorage: setStorage,
  getStorage: getStorage,
  removeStorage: removeStorage,
  clearStorage: clearStorage,
  getSetting: getSetting,
  wxPromisify: wxPromisify,
  tradingStatus: tradingStatus,
  limitedTime: limitedTime,
  getDate: getDate,
  getCountdown: getCountdown,
  toDecimal2: toDecimal2,
}
