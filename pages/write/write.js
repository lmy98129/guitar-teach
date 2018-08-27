// pages/write/write.js
const tabbar = require("../../template/tabbar");
var resArray = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarActiveIndex: 2,
    scoreList: []
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
    // let res = ['爱的初体验', 'ABCDE', '阿喵', '背叛', '宝贝', '童年', '小星星'];
    // res.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}));
    // this.setData({
    //   scoreList: res
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'https://sguitar.mybeike.com/api/score.php',
      method: 'POST',
      data: 'a=searchByUploaderId&uploader_id='+1,
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res);
        resArray = [];
        resArray = res.data
        resArray.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN', { sensitivity: 'accent' }));
        this.setData({
          scoreList: resArray
        });
        wx.setStorageSync("scoreList", resArray);
      },
      fail: res => {
        console.log(res);
      }
    });
  },


  getPrev(e) {
    wx.navigateTo({
      url: '/pages/scoreprev/scoreprev?index='+e.target.dataset.index,
    })
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

  tabbarRouteTeach(e) {
    tabbar.routeTeach(e, this);
  },

  bindUpload() {
    wx.navigateTo({
      url: '../upload/upload',
    })
  }
})