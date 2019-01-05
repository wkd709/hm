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

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  showToast: showToast,
  setStorage: setStorage,
  getStorage: getStorage,
  getSetting: getSetting,
  wxPromisify: wxPromisify,
}
