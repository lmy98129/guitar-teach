// pages/practise/practise.js
var index;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceHeight: '',
    deviceWidth: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index != undefined) {
      index = options.index;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this;    
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          deviceHeight: res.screenHeight,
          deviceWidth: res.screenWidth
        })
      },
    })
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

  },

  bindBack() {
    wx.navigateBack({
      delta: 2,
    })
  },

  goPrev() {
    wx.navigateTo({
      url: '/pages/scoreprev/scoreprev?index='+index,
    })
  },

  goFingerPrac() {
    wx.navigateTo({
      url: '/pages/fingerprac/fingerprac?index=' + index,
    })
  }

})