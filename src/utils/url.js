/**
 * url 参数
 */
export const urlParams = (() => {
  const params = {}

  if (window.location.search) {
    window.location.search
      .slice(1)
      .split('&')
      .forEach(item => {
        const items = item.split('=')
        params[items[0]] = items[1] || ''
      })
  }

  return params
})()
