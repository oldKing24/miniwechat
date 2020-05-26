// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    icon: {
      normal: '/images/sun.png',
      active: '/images/dreams.png',
      add_normal: '/images/add-normal.png',
      add_active: '/images/add.png',
      person_normal: '/images/person-normal.png',
      person_active: '/images/person-active.png',
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
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
    let that = this;
    var user=wx.getStorageSync('user') || {}; //获取用户信息
    console.log(user);
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo)
    wx.request({
      url: 'http://localhost:8080/mini/dreams/addUserInfo', //仅为示例，并非真实的接口地址
      data: {
        openId: user.openid,
        gender: e.detail.userInfo.gender,
        nickName:e.detail.userInfo.nickName,
        country:e.detail.userInfo.country,
        province:e.detail.userInfo.province,
        city:e.detail.userInfo.city,
        avatarUrl:e.detail.userInfo.avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if("0"==res.data.code){
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})