const regeneratorRuntime = require('../libs/regenerator/runtime-module');
import { host } from './config.js';

/**
 * 接口请求封装
 * url 
 * method
 * params { hideLoading,data:{} } //hideLoading 加载状态 、data 传参
 **/
const wxRequest = async (url, method, params = {}) => {
  let data = params.data || {};
  let methods = method || 'GET';
  if (!params.hideLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: methods,
      data:data,
      success: (res) => {
        if (res && res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: (e) => {
        wx.hideLoading();
      }
    })
  });
}
module.exports = {
  wxRequest,
};