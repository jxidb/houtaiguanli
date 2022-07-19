import Vue from 'vue'
import VueRouter from 'vue-router'
// 全局注册路由插件
Vue.use(VueRouter)

// 备份vuerouter原型对象上的push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

import routes from '@/router/router.js'
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    // 跳转路由时，跳到新的页面，滚动条是在最上面的
    return { y: 0 }
  }
})

export default router
