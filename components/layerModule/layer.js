// component/layerModule/layer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型
    obj: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {},
  /**
   * 组件的方法列表
   */
  methods: {
    yes() {
      this.triggerEvent('event', { btnType:true});
    },
    cancel() {
      this.triggerEvent('event', { btnType: false });
    }
  }
})
