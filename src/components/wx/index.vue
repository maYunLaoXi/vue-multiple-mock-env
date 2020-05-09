<template>
  <div>
    <button @click="getAccessToken">获取accessToken</button>
    <button @click="doCreateMenu">新增菜单</button>
    <br>
    <a :href="scopeUrl">获取用户授权snsapi_base</a>
    <div @click="getUserAccessToken(0)">获取access_token</div>
    <a :href="scopeUrl2">获取用户授权snsapi_userinfo</a>
    <div @click="getUserAccessToken(1)">获取access_token</div>
    <div @click="toGetUserInfo">接取用户信息</div>
    <div v-if="userInfo" class="user-info">
      <img :src="userInfo.headimgurl">
      <div class="nickname">{{ userInfo.nickname }}</div>
      <div class="location">{{ userInfo.country + ':' + userInfo.province + ':' + userInfo.city }}</div>
    </div>
  </div>
</template>
<script>
import { getWxAccessToken, createMenu, getUserAccessToken, getUserInfo } from 'api'
import Cookie from 'js-cookie'
import config from '@/config'

export default {
  name: 'Wx',
  data() {
    return {
      menu: {
        'button': [
          {
            'type': 'click',
            'name': '今日歌曲',
            'key': 'V1001_TODAY_MUSIC'
          },
          {
            'name': '菜单',
            'sub_button': [
              {
                'type': 'view',
                'name': '搜索',
                'url': 'http://www.soso.com/'
              },
              {
                'type': 'click',
                'name': '赞一下我们',
                'key': 'V1001_GOOD'
              }
            ]
          }
        ]
      },
      scopeUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${encodeURIComponent('http://nodetest.ngrok2.xiaomiqiu.cn/message')}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`,
      scopeUrl2: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${encodeURIComponent('http://nodetest.ngrok2.xiaomiqiu.cn/message')}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`,
      userInfo: null
    }
  },
  methods: {
    //  获取access_token
    getAccessToken() {
      getWxAccessToken().then(res => {
        console.log(res)
        debugger
        Cookie.set('access_token', res.data.access_token, { expires: 1 / 20 })
      }).catch(err => {
        console.error(err)
      })
    },
    // 新增菜单
    doCreateMenu() {
      createMenu(this.menu).then(res => {
        console.log(res)
      })
    },
    getUserAccessToken(type) {
      getUserAccessToken().then(res => {
        console.log(res)
      })
    },
    toGetUserInfo() {
      getUserInfo().then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    }
  }
}
</script>
<style scoped>
.user-info img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
