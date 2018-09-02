// components/add-btn/add-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    attach: () => {
      let props = this.properties;
      this.setData({
        url: props.url
      });
    },
    
    // NOTE: 这里不能使用箭头函数，否则无法获取this对象
    addBtnNav() {
      wx.navigateTo({
        url: this.data.url,
      })
    },
  }
})
