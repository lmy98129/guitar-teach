//index.js
const tabbar = require("../../template/tabbar");

var recomArray = [
  {
    "title": "吉他初学者必看",
    "author": "易音科技小易",
    "content": "音悦智能教学辅助设备采用PCB板、FPC板以及无毒无害的电路 板印刷工艺，保证人体健康；其表面涂有环保漆，不容易被人手的汗液"
  },
  {
    "title": "学吉他难坚持怎么办？",
    "author": "吉他红人张佳铂",
    "content": "音悦智能教学辅助设备采用PCB板、FPC板以及无毒无害的电路 板印刷工艺，保证人体健康；其表面涂有环保漆，不容易被人手的汗液"
  },
  {
    "title": "10首今年最火吉他谱",
    "author": "我的老师",
    "content": "音悦智能教学辅助设备采用PCB板、FPC板以及无毒无害的电路 板印刷工艺，保证人体健康；其表面涂有环保漆，不容易被人手的汗液"
  },
];

Page({
  data: {
    isIpx: false,
    isIp4: false,
    tabbarActiveIndex: 0,
    msgArray: []
  },
  //事件处理函数
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  onShow() {
    this.setData({
      msgArray: recomArray
    })
    // wx.hideTabBar();
    // wx.navigateTo({
    //   url: '../bluetooth/bluetooth',
    // })
  },

  tabbarRouteTeach(e) {
    tabbar.routeTeach(e, this);
  },

  bindVideoCover() {
    
  },

  goBluetooth() {
    wx.navigateTo({
      url: '../bluetooth/bluetooth',
    })
  }
})
