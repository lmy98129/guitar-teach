// pages/write/write.js
const tabbar = require("../../template/tabbar/tabbar");
const req = require("../../utils/req.js");
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
    req.getScoreList(1, this);
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
  },

  bindSetting(e) {
    let self = this, index = e.target.dataset.index;
    wx.showActionSheet({
      itemList: ['查看乐谱', '编辑乐谱', '上机练习', '删除乐谱'],
      itemColor: '#44b2b8',
      success: function (res) {
        switch(res.tapIndex) {
          case 0 :
            self.getPrev(e);
            break;
          case 1:
            wx.navigateTo({
              url: '../keyboard/keyboard?index='+index,
            })
            break;
          case 2:
            wx.navigateTo({
              url: '../practise/practise?index='+index,
            })
            break;
          case 3: 
            wx.showModal({
              title: '提示',
              content: '确定删除该乐谱？',
              showCancel: true,
              cancelText: '否',
              cancelColor: '',
              confirmText: '是',
              confirmColor: '#FF3B30',
              success: function (res) {
                if (res.confirm) {
                  req.delScoreList(e, 1, self);
                }
              },
            })
            break;
        }
      },
    })
  }
})