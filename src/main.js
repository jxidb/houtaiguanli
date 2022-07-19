import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from '@/router/index'
// 引入Vuex商店
import store from '@/store/index'
// 引入全部的API接口  并命名为API
import * as API from '@/api'
import '@/assets/common.less'
import '@/assets/home.less'
import '@/assets/index.less'
import '@/assets/reset.less'

import '@/mock/index.js'
Vue.config.productionTip = false
// 注册全局组件
Vue.use(ElementUI)

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // ...
  store.commit('GETTOKEN')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    // 创建全局事件总线
    Vue.prototype.$bus = this
    // 将所有接口都赋值给Vue原型上一个叫$API的属性上
    Vue.prototype.$API = API
  },
  router,
  store,
  created() {
    store.commit('ADDMENU', router)
  }
}).$mount('#app')
