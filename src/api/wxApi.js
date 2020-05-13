import axios from 'axios'
import config from '@/config'
import Cookie from 'js-cookie'
let access_token = Cookie.get('access_token')
let jsapi_ticket = Cookie.get('jsapi_ticket')
if (!access_token) {
  getWxAccessToken().then(res => {
    access_token = res.data.access_token
    Cookie.set('access_token', access_token, { expires: 1 / 20 })
  })
}
if (!jsapi_ticket) {
  getJsApiTicket().then(res => {
    jsapi_ticket = res.data.ticket
    Cookie.set('jsapi_ticket', jsapi_ticket, { expires: 1 / 20 })
  })
}

export function getWxAccessToken() {
  return axios.get('/wx/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: config.appId,
      secret: config.appSecret
    }
  })
}
export const createMenu = (data) => {
  return axios.request('/wx/cgi-bin/menu/create', {
    method: 'post',
    data,
    params: {
      access_token
    }
  })
}
// 网页授权access_token
export const getUserAccessToken = () => {
  return axios.get('/wx/sns/oauth2/access_token', {
    params: {
      appid: config.appId,
      secret: config.appSecret,
      code: '081HytEJ03SGya2brpHJ0VTEEJ0HytEh',
      grant_type: 'authorization_code'
    }
  })
}
// 获取jsapi_ticket
export function getJsApiTicket() {
  return axios.get('/wx/cgi-bin/ticket/getticket', {
    params: {
      access_token,
      type: 'jsapi'
    }
  })
}
// 接取用户信息
export const getUserInfo = () => {
  return axios.get('/wx/sns/userinfo', {
    params: {
      access_token: '33_hTwUJnDifDPL-emY-I6ZH4vzSgtCgNmoo_w3LhtXR294kBIHxC7OlX6ZqffDX2JSgv4fGyk3BFhLdMZoKpaXHg',
      openid: 'oprQzwX43hDOHPuIg8M9x3k85EA4',
      lang: 'zh_CN'
    }
  })
}
// 请求二维码
export const createQrCode = (data, params) => {
  return axios.post('/cgi-bin/qrcode/create', {
    params: {
      access_token
    },
    data
  })
}
