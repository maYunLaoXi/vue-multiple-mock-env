const wx = window.wx
function fn(msg) {
  alert('ready没有转入')
}

export const initWx = ({
  success = fn,
  error = fn,
  jsApiList = [],
  debug = true,
  timestamp,
  nonceStr,
  signature,
  appId
}) => {
  if (!wx) {
    alert('jsskd引用失败')
    return
  }
  wx.config({
    debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    // timestamp: Math.ceil(new Date().getTime() / 1000).toString(), // 必填，生成签名的时间戳
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名，见附录1
    jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(() => {
    wx.checkJsApi({
      jsApiList,
      success: res => {
        const { checkResult } = res
        const feild = []
        for (const [api, boolean] of Object.entries(checkResult)) {
          if (!boolean) feild.push(api)
        }
        success && success(feild)
      }
    })
  })
  wx.error(error)
}
