// component/top-widget/top-widget.js
Component({
  /**
   * 组件的设置
   */
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    searchBar: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchBar: false,
    title: '',
    topBar: '',
  },
  
  // NOTE: 生命周期函数必须写在最外层，否则无法调用控制台以及修改data
  attached: function () {
    let prop = this.properties;
    this.setData({
      searchBar: prop.searchBar,
      title: prop.title,
    });
    let self = this;
    wx.getSystemInfo({
      success: res => {
        switch (res.model) {
          case "iPhone 6":
          case "iPhone 6s":
          case "iPhone 7":
          case "iPhone 8":
            self.setData({
              topBar: "ip6"
            })
            break;
          case "iPhone 5":
          case "iPhone 5s":
          case "iPhone 5c":
          case "iPhone se":
            self.setData({
              topBar: "ip5"
            })
          break;
          case "iPhone X":
            self.setData({
              topBar: "ipx"
            })
          break;
          case "iPhone 6 Plus":
          case "iPHone 6s Plus":
          case "iPhone 7 Plus":
          case "iPhone 8 Plus":
            self.setData({
              topBar: "ip6p"
            })
          break;
        }
      },
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
