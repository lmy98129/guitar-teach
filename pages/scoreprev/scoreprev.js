// pages/scoreprev/scoreprev.js
const decode = require("../../utils/decode.js");
var item;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyArray: [],
    scrollTop: 0,
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    item = (wx.getStorageSync("scoreList"))[options.index];
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
    decode.prev(item, this);
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
      delta: 1
    })
  },

})