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

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  showToast: showToast,
}
