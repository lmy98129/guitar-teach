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
    hasAddBtn: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    attached: () => {
      let prop = this.properties;
      this.setData({
        searchBar: prop.searchBar,
        title: prop.title,
      })
    },
  }
})
