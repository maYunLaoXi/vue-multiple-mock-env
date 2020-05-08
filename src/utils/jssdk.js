const wx = window.wx
function fn(msg) {
  console.log(msg)
}

export const initWx = ({ success = fn, error = fn }) => {
  // eslint-disable-next-line no-undef
  if (!wx) {
    alert('jsskd引用失败')
    return
  }
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxc7179713e71f712c', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: Math.ceil(new Date().getTime() / 1000).toString(), // 必填，生成签名的时间戳
    nonceStr: 'jssdk-test', // 必填，生成签名的随机串
    signature: '', // 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(success)
  // wx.error(error)
}
