
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: '',
    },
    btnStyle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '',
    btnStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    attach: () => {
      let props = this.properties;
      this.setData({
        url: props.url,
        btnStyle: props.btnStyle
      });
    },

    ready: () => {

    },

    // NOTE: 这里不能使用箭头函数，否则无法获取this对象
    btnNav() {
      wx.navigateTo({
        url: this.data.url,
      })
    },
  }
})
