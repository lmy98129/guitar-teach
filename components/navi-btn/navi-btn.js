
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
    },
    insert: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '',
    btnStyle: ''
  },

  // NOTE: attach不能调用控制台，attached可以
  attached: function() {
    let props = this.properties;
    console.log(props);
    this.setData({
      url: props.url,
      btnStyle: props.btnStyle
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // NOTE: 这里不能使用箭头函数，否则无法获取this对象
    btnNav() {
      let props = this.properties;
      if (props.insert) {
        this.triggerEvent("tapbtn");
      } else {
        wx.navigateTo({
          url: this.data.url,
        })
      }
    },
  }
})
