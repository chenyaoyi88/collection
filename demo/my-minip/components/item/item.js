// Component({
//   properties: {
//     // 属性名
//     text: {
//       // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//       type: String,
//       // 属性初始值（可选），如果未指定则会根据类型选择一个
//       value: '',
//       // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//       observer: function (newVal, oldVal) {
//         console.log('newVal', newVal);
//         console.log('oldVal', oldVal);
//       }
//     },
//     text2: String // 简化的定义方式
//   },
//   // 私有数据，可用于模版渲染
//   data: {
//     msg: ''
//   },
//   methods: {
//     test: function () {
//       console.log('test');
//     }
//   }
// })
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {}
  }
})