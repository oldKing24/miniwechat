//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var that = this
     var user=wx.getStorageSync('user') || {};  
     var userInfo=wx.getStorageSync('userInfo') || {}; 
     if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))){ 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        var appid = 'wx9e17b6e507d6977f'; //填写微信小程序appid 
        var secret = 'b24fac40e69efc9e6fec53e4024e0a26'; //填写微信小程序secret 
        //调用request请求api转换登录凭证 
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + res.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.openid) //获取openid 
            var obj={};
            obj.openid=res.data.openid;  
            obj.expires_in=Date.now()+res.data.expires_in;  
            //console.log(obj);
            wx.setStorageSync('user', obj);//存储openid 
          }
        }) 
      }
    })
  }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  }
})