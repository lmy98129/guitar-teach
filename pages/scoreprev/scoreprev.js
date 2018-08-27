// pages/scoreprev/scoreprev.js
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
    this.setData({
      title: item.title
    })
    let keyArrayStr = item.content, length = item.length, keyArrayDvi = [],
      keyArrayDec = [], newKey = {}, tune = "", key = 0;
    for(var i=0; i<length; i++) {
      keyArrayDvi[i] = keyArrayStr.slice(i*3, i*3+3);
    }
    keyArrayDvi.forEach((val, i, arr) => {
      // 初始化变量
      tune = arr[i][2];
      key = parseInt(arr[i].slice(0, 2));
      // 提取和弦、升降调
      if (tune == "1") {
        newKey.tune = "b";
      } else if (tune == "3") {
        newKey.tune = "#";
      } else {
        newKey.tune = "&nbsp;&nbsp;";
      }
      // 提取编码
      if (key >= 1 && key <= 5) {
        newKey.key = key + 2;
        newKey.style = "Low";
      } else if (key >= 6 && key <= 12) {
        newKey.key = key - 5;
        newKey.style = "Mid";
      } else if (key >= 13 && key <= 17) {
        newKey.key = key - 12;
        newKey.style = "High";
      } else if (key == 0) {
        newKey.key = "&nbsp;";
      }
      // 处理结果放入数组中
      keyArrayDec.push(newKey);
      // 再次清空临时对象
      newKey = {};
    })
    // console.log(keyArrayDec);
    // 将处理结果返回前端
    this.setData({
      keyArray: keyArrayDec,
      scrollTop: 80 * keyArrayDec.length
    });
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
  }
})