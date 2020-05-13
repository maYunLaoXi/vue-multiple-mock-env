// 微信sdk测试
<template>
  <div>
    <button @click="init">js-sdk-init</button>
    <div>{{ initWxResult }}</div>
    <div class="test">
      <button @click="goChooseImage">chooseImage</button>
      <img style="width: 100%" :src="img" alt="">
      <button @click="previewImage">预览图片</button>
      <button @click="goChooseImage('upload')">uploadImage</button>
      <button @click="goDownloadImage()">downloadImage</button>
      <div>{{ serverId }}</div>
    </div>
    <div>
      <button @click="goGetLocation">getLocation</button>
      <button @click="goOpenLocation">openLocation</button>
    </div>
    <div class="record">
      <van-button type="default" @click="record(0)">startRecord</van-button>
      <van-button type="default" @click="record(1)">stopRecord</van-button>
      <van-button type="default" @click="record(2)">playRecord</van-button>
      <van-button type="default" @click="record(3)">translateVoice</van-button>
      <div>{{ translateResult }}</div>
    </div>
    <div class="qr-code">
      <van-button plain type="primary" @click="qrCode">qr-code</van-button>
    </div>
    <button @click="closeWindow">closeWindow</button>
  </div>
</template>
<script>
import { initWx } from '@/utils'
import { getSignature } from 'api'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant'
const wx = window.wx

Vue.use(Vant)
export default {
  name: 'WxSDK',
  data() {
    return {
      initWxResult: 'click"js-sdk-init" to begin',
      img: '',
      serverId: '',
      translateResult: ''
    }
  },
  created() {
  },
  methods: {
    closeWindow: wx.closeWindow,
    init() {
      getSignature().then(res => {
        initWx({
          ...res.data,
          jsApiList: [
            'chooseImage', 'uploadImage', 'downloadImage', 'previewImage',
            'updateAppMessageShareData',
            'openLocation', 'getLocation', 'closeWindow',
            'startRecord', 'stopRecord', 'playVoice', 'translateVoice',
            'scanQRCode'
          ],
          success: res => {
            if (res.length) console.error('不被支持的api', res)
            console.log('wx.config success')
            this.initWxResult = 'success'
            wx.updateAppMessageShareData({
              title: 'title hello',
              desc: 'share description hello word',
              link: 'www.baidu.com',
              imgUrl: 'https://thispersondoesnotexist.com/',
              success: () => {
                console.log('init share success')
                debugger
              }
            })
          }
        })
      })
    },
    goChooseImage(type) {
      if (type !== 'upload') {
        wx.chooseImage({
          success: res => {
            console.log(res)
            this.img = res.localIds
          },
          error: err => {
            console.log('err', err)
          }
        })
      } else {
        if (!this.img) return
        wx.uploadImage({
          localId: this.img.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function(res) {
            console.log('up', res)
            const serverId = res.serverId // 返回图片的服务器端ID
            this.serverId = serverId.toString()
            console.log(this.serverId)
          }
        })
      }
    },
    goDownloadImage() {
      console.log('get serverId', this.serverId)
      wx.downloadImage({
        serverId: 'zurelvnq2jB44jlHRux1kuiOxOa0R__xGPISE4GCqi7rJC4gq9aPJNIefd_aI8Hd',
        isShowProgressTips: 1,
        success: res => {
          console.log('do', res)
        }
      })
    },
    previewImage() {
      wx.previewImage({
        current: '',
        urls: [
          'https://tuchong.pstatp.com/1012192/f/272485452.jpg',
          'http://pic3.pocoimg.cn/image/poco/works/28/2018/1203/23/15438501258945068_179144274.jpg?imageMogr2/auto-orient/thumbnail/x1920/blur/1x0/quality/100&',
          'http://pic3-nc.pocoimg.cn/image/poco/works/28/2018/1203/23/15438501258195297_179144274_H1920.jpg',
          'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
        ]
      })
    },
    //  地理位置
    goGetLocation() {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          console.log('location', res)
          const { latitude, longitude } = res
          this.location = {
            latitude,
            longitude
          }
          // var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed // 速度，以米/每秒计
          // var accuracy = res.accuracy // 位置精度
        }
      })
    },
    goOpenLocation() {
      wx.openLocation({
        latitude: 0, // 纬度，浮点数，范围为90 ~ -90
        longitude: 0, // 经度，浮点数，范围为180 ~ -180。
        name: '', // 位置名
        address: '', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转,
        ...this.location
      })
    },
    record(type) {
      if (type === 0) {
        wx.startRecord()
        Toast.loading({
          message: '正在录音...',
          loadingType: 'spinner',
          duration: 0
        })
      } else if (type === 1) {
        Toast.clear()
        wx.stopRecord({
          success: (res) => {
            this.localId = res.localId
            console.log('recordLocalId', this.localIds)
          }
        })
      } else if (type === 2) {
        wx.playVoice({
          localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
        })
      } else if (type === 3) {
        wx.translateVoice({
          localId: this.localId, // 需要识别的音频的本地Id，由录音相关接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: (res) => {
            if (res.translateResult) this.translateResult = res.translateResult
          }
        })
      }
    },
    qrCode() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          console.log('qrcode', res)
          this.result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        }
      })
    }
  }
}
</script>
