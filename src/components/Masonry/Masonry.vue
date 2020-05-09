<template>
  <div class="mas-container">
    <div @click="chooseImage">chooseImage</div>
    <div @click="testWx">getWxAccess_token</div>
    <div v-for="item in items" :key="item.index" :style="{ height: item.height }" class="mas-item">{{ item.height }} ： {{ item.index }}</div>
  </div>
</template>
<script>
import { initWx } from '@/utils/jssdk'
import { getWxAccessToken } from 'api'
const wx = window.wx

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    for (const i of '0123456789') {
      const { random, floor } = Math
      const num = floor(random() * 100) + 20
      this.items.push({
        height: num + 'px',
        index: i
      })
    }
    // 初始化JSSDK
    initWx({
      success: () => {
        console.log('JSSDK调用成功')
        wx.checkJsApi({
          jsApiList: ['chooseImage'],
          success: res => {
            // debugger
          }
        })
      },
      // eslint-disable-next-line handle-callback-err
      error: () => {
        console.error('JSSDK调用失败')
      }
    })
  },
  methods: {
    getWxAccessToken,
    testWx() {
      this.getWxAccessToken().then(res => {
        debugger
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        debugger
      })
    },
    chooseImage() {
      wx.chooseImage({
        count: 2,
        success: _ => {
          console.log(_)
        }
      })
    }
  }
}
</script>
<style scoped>
.mas-container {
  column-count: 2;
  column-gap: 2px;
}
.mas-item{
  background: 'pink';
  break-inside: avoid;
  background-color: red;
  margin-bottom: 3px;
}
</style>
