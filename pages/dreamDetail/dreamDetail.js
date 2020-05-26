// pages/dreamDetail/dreamDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    commentsNum: "",
    content: "",
    createTime: "",
    createTimeDesc: "",
    id: "",
    likeNum: "",
    nickName: "",
    openId: "",
    commentList:[],
    picPaths: [{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    },{
      picPath:"/images/美食.png"
    }],
    shareNum: "",
    tagColor: "",
    tagName: "",
    title: "",
    InputBottom: 0,
    isComment:false,
  },
  InputFocus(e) {
    this.setData({
      // InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0,
      isComment:false,
    })
  },
  gotoIndex(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  openCommet(e){
    this.setData({
      isComment:true,
      InputBottom: e.detail.height
    })
  },
  addComment(e){
    console.log(e)
    var user=wx.getStorageSync('user') || {}; //获取用户信息
    var userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: 'http://192.168.1.128:8080/mini/dreams/addComments', //,
      data:{
        dreamsId:this.data.id,
        commentContent:e.detail.value.commentContent,
        commentor:user.openid,
        commentorName:app.globalData.userInfo.nickName,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let that = this;
    wx.request({
      url: 'http://192.168.1.128:8080/mini/dreams/getDreamDetail', //,
      data:{
        id:id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
          that.setData({
            avatarUrl: res.data.data.avatarUrl,
            commentsNum: res.data.data.commentsNum,
            content: res.data.data.content,
            createTime: res.data.data.createTime,
            createTimeDesc: res.data.data.createTimeDesc,
            id: res.data.data.id,
            likeNum: res.data.data.likeNum,
            nickName: res.data.data.nickName,
            openId: res.data.data.openId,
            shareNum: res.data.data.shareNum,
            tagColor: res.data.data.tagColor,
            tagName: res.data.data.tagName,
            title: res.data.data.title,
          })
        }
      }
    })
    wx.request({
      url: 'http://192.168.1.128:8080/mini/dreams/getComments', //,
      data:{
        id:id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
          that.setData({
            commentList:res.data.data
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