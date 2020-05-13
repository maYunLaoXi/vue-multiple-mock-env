// userAgetn
const ua = window.navigator.userAgent
const lowerUa = ua.toLowerCase()

// 微信浏览器
export const isWeiXin = lowerUa.indexOf('micromessenger') !== -1