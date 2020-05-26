// pages/addDream/addDream.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    icon: {
      normal: '/images/sun.png',
      active: '/images/dreams.png',
      add_normal: '/images/add-normal.png',
      add_active: '/images/add.png',
      person_normal: '/images/person-normal.png',
      person_active: '/images/person-active.png',
    },
    imgList: [],
    show: false,
    tagId:'',
    tagName:'',
    tagColor:'',
    action:[{
      id:'1',
      name:"音乐",
      color:"green"
    }]
  },
  onClose() {
    this.setData({ show: false });
  },
  onOpen(){
    this.setData({show:true});
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
       show: false ,
       tagColor:event.detail.color,
       tagName:event.detail.name,
       tagId:event.detail.id,
    });
  },
  formSubmit:function(e){
    var user=wx.getStorageSync('user') || {}; //获取用户信息
    console.log(e)
    let title = e.detail.value.title;
    let content = e.detail.value.content;
    wx.request({
      url: 'http://192.168.1.128:8080/mini/dreams/addDreams', //新增梦境
      data:{
        openId:user.openid,
        title:title,
        tagColor:this.data.tagColor,
        tagName:this.data.tagName,
        content:content,
        picPath:this.data.imgList,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
          wx.redirectTo({
            url: '../index/index'
          })
        }
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        wx.uploadFile({
          // url: 'http://192.168.1.128:8080/mini/dreams/upload',
          // url: 'http://192.168.0.101:8080/mini/dreams/upload',
          filePath: tempFilePaths[0],
          name: 'file',   
          formData: {  
            'user': 'test'
          },
          success (res){
            const data = res.data
            console.log("---------"+data);
            //do something
          }
        })
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '筑梦者',
      content: '确定要删除这段梦境吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
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
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://192.168.1.128:8080/mini/dreams/getTags', //
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);
        if("0"==res.data.code){
         that.setData({
          actions:res.data.data
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