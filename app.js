//app.js
App({
  data: {
    isIpx: false,
    isIp5: false,
  },

  onLaunch: function () {
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        switch(res.model) {
          case "iPhone X":
            self.data.isIpx = true;
            break;
          case "iPhone 5":
          case "iPhone 5s":
          case "iPhone 5c":
            self.data.isIp5 = true;
            break;
        }
      },
    })
    // wx.hideTabBar();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    tabbarActiveIndex: 0
  }
})