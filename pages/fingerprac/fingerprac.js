// pages/fingerprac/fingerprac.js
const decode = require("../../utils/decode");
var keyArrayEnc = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyArray: [],
    cursorPos: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index != undefined) {
      let scoreList = wx.getStorageSync("scoreList")[options.index];
      keyArrayEnc = decode.edit(scoreList, this);
    }
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

  },

  lastScore() {
    if (this.data.cursorPos == 0) {
      this.setData({
        cursorPos: 0
      })
    } else {
      this.setData({
        cursorPos: this.data.cursorPos - 1
      })
    }
  },

  nextScore() {
    if (this.data.cursorPos >= keyArrayEnc.length) {
      this.setData({
        cursorPos: keyArrayEnc.length - 1
      })
    } else {
      this.setData({
        cursorPos: this.data.cursorPos + 1
      })
    }
  },

  setCursor(e) {
    let index = e.target.dataset.index;
    this.setData({
      cursorPos: index
    })
  },

  bindBack() {
    wx.navigateBack({
      delta: 2,
    })
  },

  goBluetooth() {
    wx.navigateTo({
      url: '../bluetooth/bluetooth',
    })
  }
})