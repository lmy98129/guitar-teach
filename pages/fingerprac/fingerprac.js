// pages/fingerprac/fingerprac.js
const decode = require("../../utils/decode");
const encode = require("../../utils/encode");
var keyArrayEnc = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyArray: [],
    cursorPos: 0,
    scrollTop: 0
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
      // if (this.data.cursorPos % 30 == 0 && this.data.cursorPos !== 0) {
      //   this.setData({
      //     scrollTop: this.data.scrollTop - 5 * 100
      //   })
      // }
      // 这个滚动条跟随光标的算法实在诡异，不知道如何是好。。。
      this.setData({
        cursorPos: this.data.cursorPos - 1
      })
    }
  },

  nextScore() {
    if (this.data.cursorPos >= keyArrayEnc.length - 1) {
      this.setData({
        cursorPos: keyArrayEnc.length - 1
      })
    } else {
      if (this.data.cursorPos % 30 == 0 && this.data.cursorPos !== 0) {
        this.setData({
          scrollTop: this.data.scrollTop + 5 * 100
        })
      }
      this.setData({
        cursorPos: this.data.cursorPos + 1,
      })
    }
  },

  setCursor(e) {
    let index = e.target.dataset.index;
    this.setData({
      cursorPos: index
    })
  },

  emitScore() {
    let message = "@TS"+keyArrayEnc[this.data.cursorPos]+"#";
    let byteArray = encode.str2bytes(message);
    let targetDeviceId = wx.getStorageSync("deviceId");
    let buffer = new ArrayBuffer(message.length);
    let dataView = new DataView(buffer);
    let index = 0;
    
    for (let i=0; i<message.length; i++) {
      dataView.setUint8(i, byteArray[i]);
    }

    wx.writeBLECharacteristicValue({
      deviceId: targetDeviceId,
      serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
      characteristicId: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
      value: buffer,
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
        wx.showModal({
          title: '发送失败',
          content: '设备连接已断开，请点击左侧蓝牙连接按钮进行连接',
          showCancel: false
        })
      }
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