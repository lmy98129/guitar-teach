// pages/slowprac/slowprac.js
const decode = require("../../utils/decode");
const encode = require("../../utils/encode");
const bluetooth = require("../../utils/bluetooth");
var keyArrayEnc = "";
var code, mode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyArray: [],
    cursorPos: 0,
    scrollTop: 0,
    touchable: true,
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index != undefined) {
      let scoreList = wx.getStorageSync("scoreList")[options.index];
      keyArrayEnc = decode.edit(scoreList, this);
      wx.setStorageSync("emittingArray", keyArrayEnc);
    }
    if (options.code != undefined) {
      code = options.code;
    }
    if (options.mode != undefined) {
      mode = options.mode;
      if (mode == "slow") {
        this.setData({
          title: "慢弹练习"
        });
      } else {
        this.setData({
          title: "连弹练习"
        })
      }
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
    wx.setStorageSync("emittingArray", []);
    code = undefined;
    mode = undefined;
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
    let curPos = 0, message;
    this.setData({
      touchable: false
    })
    if (code != undefined) {
      message = "@T" + code + "#";
      bluetooth.send(message, this);
    } else {
      bluetooth.sendLoop(curPos, mode, this);
    }
  },

  bindBack() {
    wx.navigateBack({
      delta: 1,
    })
  },

  goBluetooth() {
    wx.navigateTo({
      url: '../bluetooth/bluetooth',
    })
  }
})