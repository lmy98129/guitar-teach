// pages/send/send.js
const req = require("../../utils/req");

var keyArrayCur = [];
var keyArrayStr = "";
// 上传者ID先写死
var uploader = 1;
var id, isEdit = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    keyArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isEdit != undefined) {
      this.setData({
        title: options.title
      })
      id = options.id;
      isEdit = options.isEdit;
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
    keyArrayCur = wx.getStorageSync("keyArrayCur");
    this.setData({
      keyArray: wx.getStorageSync("keyArrayShow")
    })
    console.log(keyArrayCur);
    keyArrayCur.forEach((value, index) => {
      keyArrayStr = keyArrayStr + value;
    });
    // console.log(keyArrayStr);
    // console.log(keyArrayCur.length);
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
    keyArrayCur = [];
    keyArrayStr = "";
    isEdit = false;
    id = null;
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

  listenTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  bindSave() {
    if (this.data.title == "" || this.data.title == null || this.data.title == undefined) {
      wx.showModal({
        title: '提示',
        content: '乐谱标题为空',
        showCancel: false,
        confirmText: '好的'
      });
      return;
    }
    console.log("isEdit", isEdit);
    if (isEdit) {
      req.updateScore(uploader, id, keyArrayCur.length, keyArrayStr, this);
    } else {
      req.uploadScore(uploader, keyArrayCur.length, keyArrayStr, this);
    }
  },

  bindBack() {
    wx.navigateBack({
      delta: 1
    });
  }, 
})