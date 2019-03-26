// 配置API接口地址
let root = 'https://cnodejs.org/api/v1'

// 引用axios
let axios = require('axios')

// 自定义判断元素类型
function toType (obj) {
  return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false,
    timeout: 10000
  })
    .then(function (res) {
      if (res.data.success === true) {
        if (success && typeof success === 'function') {
          success(res.data)
        }
      } else {
        if (failure && typeof failure === 'function') {
          failure(res.data)
        } else {
          console.error('error: ' + JSON.stringify(res.data))
        }
      }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        console.error('api error, HTTP CODE: ' + res.status)
      }
    })
}

export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
