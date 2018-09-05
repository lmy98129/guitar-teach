// pages/upload/upload.js
const encode = require("../../utils/encode");
const decode = require("../../utils/decode");
var keyArrayEnc = [];
var id, title, isEdit = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: "Mid",
    tune: "Normal",
    scoreTime: "1",
    keyArray: [],
    scrollTop: 0,
    cursorPos: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("isSaved", false);
    if (options.index !== undefined) {
      isEdit = true;
      let item = wx.getStorageSync("scoreList")[options.index]
      id = item.id;
      title = item.title;
      keyArrayEnc = decode.edit(item, this);
      this.setData({
        cursorPos: keyArrayEnc.length - 1
      })
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
    isEdit = false;
    keyArrayEnc = [];
    id = null;
    title = null;
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

  setStyle(e) {
    console.log(e.target.dataset.style);
    if (e.target.dataset.style == "Finger") {
      wx.showModal({
        title: '提示',
        content: '当前暂不支持设置指弹',
        showCancel: false,
        confirmText: '好的'
      });
      return;
    }
    this.setData({
      style: e.target.dataset.style
    })
  },

  setTune(e) {
    console.log(e.target.dataset.tune);
    // this.setData({
    //   tune: e.target.dataset.tune
    // })
    wx.showModal({
      title: '提示',
      content: '当前暂不支持设置升降调以及和弦。',
      showCancel: false,
      confirmText: '好的'
    });
  },

  setScoreTime(e) {
    console.log(e.target.dataset.time);
    this.setData({
      scoreTime: e.target.dataset.time
    })
  },

  setTimeBase() {
    wx.showModal({
      title: '提示',
      content: '当前仅支持1/8拍（三十二分音符）为基准，向上递增4种时值到1拍（四分音符）。',
      showCancel: false,
      confirmText: '好的'
    });
  },

  setCursor(e) {
    let index = e.target.dataset.index;
    this.setData({
      cursorPos: index
    })
  },

  showHelper() {
    wx.showModal({
      title: '帮助',
      content: "1. “帮助”键右侧是当前要输入音符的时值，当前仅支持1/8拍（三十二分音符）为基准，向上递增4种时值到1拍（四分音符）。2. 指弹、和弦以及升降调功能暂时不支持。3. 点击上方输入界面的任意音符，即可移动光标到该音符位置，从而实现插入音符或删除音符。4. 保存乐谱请点击右上角保存按钮。",
      showCancel: false,
      confirmText: '好的'
    })
  },

  inputKey(e) {
    // 判断当前乐谱长度，大于300则提示
    if (keyArrayEnc.length >= 300 && e.target.dataset.key != "del") {
      wx.showModal({
        title: '提示',
        content: '乐谱长度最长为300，如有需要请分段上传',
        showCancel: false,
        confirmText: '好的'
      });
      return;
    }
    let res = encode.inputKey(keyArrayEnc, this, e);
    if (res == undefined) {
      return;
    } else {
      keyArrayEnc = res;
    }
  },

  bindBack() {
    if (wx.getStorageSync("isSaved") == false){
      wx.showModal({
        title: '提示',
        content: '确定放弃编辑？',
        confirmText: '是',
        confirmColor: 'red',
        cancelText: '否',
        cancelColor: 'black',
        success: (res) => {
          if (res.confirm) {
            keyArrayEnc = [];
            this.setData({
              keyArray: []
            })
            wx.navigateBack({
              delta: 2
            });
          }
        },
      });
    } else {
      wx.setStorageSync("isSaved", false);
      wx.navigateBack({
        delta: 2
      });
    }
  }, 

  bindSend() {
    if (keyArrayEnc.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '乐谱长度为0，请输入乐谱内容后再保存',
        showCancel: false,
        confirmText: '好的'
      });
      return;
    }
    wx.setStorageSync("keyArrayCur", keyArrayEnc);
    wx.setStorageSync("keyArrayShow", this.data.keyArray);
    if (isEdit) {
      wx.navigateTo({
        url: "../send/send?isEdit=true&id="+id+"&title="+title,
      })
    } else {
      wx.navigateTo({
        url: '../send/send',
      })
    }
  },
})