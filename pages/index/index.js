//index.js
//获取应用实例
const app = getApp()
import Toast from '../dist/toast/toast';

Page({
  data: {
    isDot:true,
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    icon: {
      normal: '/images/sun.png',
      active: '/images/dreams.png',
      add_normal: '/images/add-normal.png',
      add_active: '/images/add.png',
      person_normal: '/images/person-normal.png',
      person_active: '/images/person-active.png',
    },
    dreamList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    console.log(event);
    if(event.detail==2){
      wx.redirectTo({
        url: '../person/person'
      })
    }else if(event.detail==1){
      wx.redirectTo({
        url: '../addDream/addDream'
      })
    }else if(event.detail==0){
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },
  gotoDetail(e){
    console.log(e)
    wx.redirectTo({
      url: '../dreamDetail/dreamDetail?id='+e.currentTarget.dataset.id
    })
  },
  shareDream:function(e){
    console.log(e)
    let index = e.target.dataset.curindex
    console.log(this.data.dreamList)
    if(e.target.dataset.shoucangstatus){
      wx.showToast({
        title:"取消收藏",
        image: '/images/unshoucang.png',
        duration: 2000,
        mask:false
      })
      this.data.dreamList[index].shoucangStatus = false;
    }else{
      wx.showToast({
        title:"收藏",
        image: '/images/shoucang.png',
        duration: 2000,
        mask:false
      })
      this.data.dreamList[index].shoucangStatus = true;
      var user=wx.getStorageSync('user') || {}; //获取用户信息
      var userInfo = wx.getStorageSync('userInfo')
      this.shoucangDream(user.openid,e.target.dataset.id,userInfo.nickName);
    }
    this.setData({
      dreamList:this.data.dreamList
    })
  },
  onLoad: function () {
    var user=wx.getStorageSync('user') || {}; //获取用户信息
    let that = this;
    wx.request({
      url: 'http://192.168.1.110:8080/mini/dreams/getDreamsPages', //,
      data:{
        pagerSize:1,
        currentPage:1,
        keyWord:"",
        openId:user.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
          that.setData({
            dreamList:res.data.data
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  shoucangDream(openid,id,nickname){
    wx.request({
      url: 'http://192.168.1.110:8080/mini/dreams/shoucangDream', //
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值post请求
      },
      data:{
        dreamsId:id,
        shareId:openid,
        shareName:nickname
      },
      method:"POST",
      success (res) {
        
      }
    })
  }
})
