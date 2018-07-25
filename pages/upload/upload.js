// pages/upload/upload.js

var keyArrayEnc = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: "Mid",
    tune: "Normal",
    keyArray: [],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  setStyle(e) {
    console.log(e.target.dataset.style);
    this.setData({
      style: e.target.dataset.style
    })
  },

  setTune(e) {
    console.log(e.target.dataset.tune);
    this.setData({
      tune: e.target.dataset.tune
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
    // 初始化音符JSON对象newKey、音符编码字符串newKeyStr、乐谱数组newKeyArray、音符数值keyNum
    let newKey = {}, newKeyStr = "", newKeyArray = new Array();
    let keyNum = parseInt(e.target.dataset.key);    
    newKeyArray = this.data.keyArray;
    // 判断输入按键类型
    if (e.target.dataset.key != "space" && e.target.dataset.key != "del") {
      // 先处理界面中的显示格式
      newKey.key = keyNum;
      newKey.style = this.data.style;
      // 判断高低中音
      switch(this.data.style) {
        case "Finger":
          // 暂时忽略“指弹”
          return;
          break;
        case "Low": 
          if (keyNum < 3) {
            // 低音mi以下自动忽略
            return;
          }
          break;
        case "High":
          if (keyNum > 5) {
            // 高音so以上自动忽略
            return;
          }
      }
      // 判断和弦、升降调
      switch(this.data.tune) {
        case "Chord":
          // 暂时忽略和弦
          return;
          break;
        case "Up": 
          newKey.tune = "#"
          break;
        case "Down":
          newKey.tune = "b"
          break;
        default:
          newKey.tune = "&nbsp;&nbsp;"
      }
      // 再处理需要保存的字符串数组
      // 判断高低中音
      switch(this.data.style) {
        case "Finger": 
          // 暂时忽略“指弹”
          return;
          break;
        case "Low": 
          if (keyNum < 3){
            // 低音mi以下自动忽略
            return;
          } else {
            // 处理编码
            newKeyStr = newKeyStr + "0" + (keyNum - 2).toString();
          }
          break;
        case "Mid":
          // 处理编码
          if (keyNum < 5) {
            newKeyStr = newKeyStr + "0" + (keyNum + 5).toString();
          } else {
            newKeyStr = newKeyStr + (keyNum + 5).toString();
          }
          break;
        case "High":
          if (keyNum > 5) {
            // 高音so以上自动忽略
            return;
          } else {
            // 处理编码
            newKeyStr = newKeyStr + (keyNum + 12).toString();
          }
      }
      // 判断和弦、升降调
      switch(this.data.tune) {
        case "Down": 
          newKeyStr = newKeyStr + "1";
          break;
        case "Normal":
          newKeyStr = newKeyStr + "2";
          break;
        case "Up": 
          newKeyStr = newKeyStr + "3";
          break;
        case "Chord":
          newKeyStr = newKeyStr + "4";
          break;
      }
      keyArrayEnc.push(newKeyStr);
      newKeyArray.push(newKey);
    } else if (e.target.dataset.key == "space") {
      // 输入空格
      newKey.key = "&nbsp;";
      newKey.tune = "&nbsp;&nbsp;"
      newKeyStr = "001";
      keyArrayEnc.push(newKeyStr);
      newKeyArray.push(newKey);   
    } else if (e.target.dataset.key == "del") {
      // 删除音符
      newKeyArray.pop();
      keyArrayEnc.pop();
    }
    // 将乐谱处理结果返回
    this.setData({
      keyArray: newKeyArray,
      scrollTop: 80 * newKeyArray.length
    });
    console.log(this.data.keyArray);
    console.log(keyArrayEnc);
  },

  bindBack() {
    wx.navigateBack({
      delta: 2
    });
  }
})