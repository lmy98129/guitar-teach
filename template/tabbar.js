const tabbarRouteTeach = (e, that) => {
  console.log("tabbar跳转到页面：", e.currentTarget.dataset.index);
  var index = e.currentTarget.dataset.index;
  switch (index) {
    case "0":
      wx.switchTab({
        url: '../index/index'
      });
      break;
    case "1":
      wx.switchTab({
        url: '../complete/complete'
      });
      break;
    case "2":
      wx.switchTab({
        url: '../write/write'
      });
      break;
    case "3":
      wx.switchTab({
        url: '../friends/friends'
      });
      break;
    case "4":
      wx.switchTab({
        url: '../data/data'
      });
      break;
    
  }
  that.setData({
    tabbarActiveIndex: parseInt(index)
  });
  getApp().globalData.tabbarActiveIndex = parseInt(index);
}

module.exports = {
  routeTeach: tabbarRouteTeach
}